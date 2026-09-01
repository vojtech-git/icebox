# Icebox

A smart fridge tracker focused on effortless food logging and timely expiration alerts so nothing goes to waste.

## Analysis

### Wireframes

![Main Screen Wireframe](./analysis/main_screen.jpg)
![Add Fridge Wireframe](./analysis/add_fridge.jpg)
![Add Food Wireframe](./analysis/add_food.jpg)

### Use cases

```mermaid
graph LR
    User([User])
    subgraph Icebox
        UC1[Add Fridge]
        UC2[Add Food]
        UC3[Update Fridge Name]
        UC4[Update Food Name or Expiration Date]
        UC5[Remove Fridge]
        UC6[Remove Food]
    end
    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
    User --> UC6
```

#### Add fridge

1. User clicks add fridge button on the main screen
2. System shows a prompt window where the user can input the new fridge name and confirm
3. User inputs the fridge name and confirms
4. System shows the main screen with the new fridge added and saves the new fridge into database

#### Add food

1. User clicks add food button inside some fridge
2. System shows a prompt window where the user can input the name of the food and expiration date
3. User inputs the food name and expiration date and confirms
4. System shows the main screen with new food added to the coresponding fridge and saves new food in the database

#### Update fridge name

1. User clicks edit fridge button on some fridge
2. System shows a prompt window where the user can edit the name of the fridge with the existing name pre-filled
3. User inputs the new name and confirms
4. System shows the main screen with the fridge name changed and saves changes into database

#### Update food name or expiration date

1. User clicks some food
2. System shows a prompt window where the user can edit the name of the food and its expiration date with the existing values pre-filled
3. User inputs new name or expiration date and confirms
4. System shows the main screen with the food values changed and saves changes into database

#### Remove fridge

1. User clicks the remove fridge button on some fridge
2. System shows the main screen with the fridge removed and removes the fridge and all its food from the database

#### Remove food

1. User clicks the remove food button on some food
2. System shows the main screen with the food removed and removes the food from the database

### Domain diagram

```mermaid
classDiagram
    class Fridge {
        +name: String
    }
    class Food {
        +name: String
        +expirationDate: Date
    }

    Fridge "1" -- "0..*" Food : contains
```

## Design

### Endpoint definition

- GET /fridge
  - Gets all fridges and their food ids
- GET /fridge/{id}
  - Gets fridge and its food ids
- GET /food/{id}
  - Gets food and its name and expiration date
- POST /fridge
  - Creates fridge with name
- POST /food
  - Creates food with name and expiration date
- PATCH /food/{id}
  - Updates food name or expiration date
- PATCH /fridge/{id}
  - Updates fridge name
- DELETE /fridge/{id}
  - Deletes a fridge and all its food
- DELETE /food/{id}
  - Deletes food

### BE class diagram

```mermaid
%%{init: {'class': {'hideEmptyMembersBox': true}}}%%
classDiagram
    namespace Domain {
        class Fridge {
            +Guid Id
            +String Name
            +DateTime DateCreated
            +List~Guid~ FoodIds
            +UpdateName(String)
        }
        class Food {
            +Guid Id
            +String Name
            +DateTime ExpirationDate
            +Guid FridgeId
            +UpdateDetails(String, DateTime)
        }
    }
    namespace Application {
        class IFridgeRepository {
            <<interface>>
            +AddAsync(Fridge, CancellationToken)
            +GetAllAsync(CancellationToken) List~Fridge~
            +GetByIdAsync(Guid, CancellationToken) Fridge
            +DeleteAsync(Fridge, CancellationToken)
            +SaveChangesAsync(CancellationToken)
        }
        class IFoodRepository {
            <<interface>>
            +AddAsync(Food, CancellationToken)
            +GetByIdAsync(Guid, CancellationToken) Food
            +DeleteAsync(Food, CancellationToken)
            +SaveChangesAsync(CancellationToken)
        }
    }
    namespace Infrastructure {
        class IceboxDbContext {
            +DbSet~Fridge~ Fridges
            +DbSet~Food~ Foods
        }
        class FridgeRepository {
            -IceboxDbContext _context
        }
        class FoodRepository {
            -IceboxDbContext _context
        }
    }
    namespace API {
        class FridgeController {
            -IMediator _mediator
        }
        class FoodController {
            -IMediator _mediator
        }
    }

    FridgeController --> IMediator : uses
    FoodController --> IMediator : uses
    FridgeRepository ..|> IFridgeRepository : implements
    FoodRepository ..|> IFoodRepository : implements
    FridgeRepository --> IceboxDbContext : uses
    FoodRepository --> IceboxDbContext : uses
    IceboxDbContext --> Fridge : manages
    IceboxDbContext --> Food : manages
    Fridge "1" o-- "0..*" Food : contains
```

### FE class diagram

This project follows a Clean Architecture pattern, separating the application into distinct layers:

- Domain: Contains business models and abstract repository interfaces, completely independent of any frameworks or external libraries.
- Application: Manages business logic and state using Angular Signals, coordinating actions between the UI and data layers.
- Integration: Implements the concrete data-fetching mechanisms (e.g., `HttpFridgeRepository` using Angular's `HttpClient`) to communicate with external APIs.
- Presentation (UI): Consists of standalone Angular components and templates that interact exclusively with the application services.

```mermaid
%%{init: {'class': {'hideEmptyMembersBox': true}}}%%
classDiagram
    namespace Domain {
        class Fridge {
            +string id
            +string name
            +string[] foods
        }
        class Food {
            +string id
            +string name
            +string expirationDate
        }
        class FridgeRepository {
            +fetchFridges() Observable~Fridge[]~
            +createFridge(name) Observable~Fridge~
            +createFood(fridgeId, name, expirationDate) Observable~Food~
            +updateFridge(id, name) Observable~Fridge~
            +deleteFridge(id) Observable~boolean~
            +updateFood(id, name, expirationDate) Observable~Food~
            +deleteFood(id) Observable~boolean~
        }
    }
    namespace Application {
        class FridgeService {
            -repository: FridgeRepository
            +fridges: Signal~Fridge[]~
            +isLoading: Signal~boolean~
            +error: Signal~string | null~
            +loadAllFridges() void
            +createFridge(name) void
            +createFood(fridgeId, name, expirationDate) void
            +updateFridge(id, name) void
            +deleteFridge(id) void
            +updateFood(fridgeId, foodId, name, expirationDate) void
            +deleteFood(fridgeId, foodId) void
        }
    }
    namespace Presentation {
        class MainComponent {
            +fridgeService: FridgeService
            +isFridgeModalOpen: Signal~boolean~
            +newFridgeName: Signal~string~
            +isEditFridgeModalOpen: Signal~boolean~
            +editFridgeId: Signal~string | null~
            +editFridgeName: Signal~string~
            +isFoodModalOpen: Signal~boolean~
            +newFoodName: Signal~string~
            +newFoodExpiration: Signal~string~
            +activeFridgeId: Signal~string | null~
            +isEditFoodModalOpen: Signal~boolean~
            +editFoodId: Signal~string | null~
            +editFoodFridgeId: Signal~string | null~
            +editFoodName: Signal~string~
            +editFoodExpiration: Signal~string~
            +ngOnInit() void
            +openCreateFridgeModal() void
            +closeModal() void
            +confirmCreateFridge() void
            +openEditFridgeModal(fridgeId, currentName) void
            +closeEditFridgeModal() void
            +confirmEditFridge() void
            +deleteFridge(id) void
            +openCreateFoodModal(fridgeId) void
            +closeFoodModal() void
            +confirmCreateFood() void
            +openEditFoodModal(fridgeId, food) void
            +closeEditFoodModal() void
            +confirmEditFood() void
            +deleteFood(fridgeId, foodId) void
        }
    }

    namespace Integration {
        class HttpFridgeRepository {
            -fridgeUrl: string
            -foodUrl: string
            +constructor(http: HttpClient)
            +fetchFridges() Observable~Fridge[]~
            +createFridge(name) Observable~Fridge~
            +createFood(fridgeId, name, expirationDate) Observable~Food~
            +updateFridge(id, name) Observable~Fridge~
            +deleteFridge(id) Observable~boolean~
            +updateFood(id, name, expirationDate) Observable~Food~
            +deleteFood(id) Observable~boolean~
        }
    }

    MainComponent --> FridgeService : uses
    FridgeService --> FridgeRepository : uses
    FridgeRepository <|-- HttpFridgeRepository : implements
    FridgeService --> Fridge : uses
    FridgeService --> Food : uses
    FridgeRepository --> Fridge : returns
    FridgeRepository --> Food : returns
```

## Implementation

### BE

### FE

## Testing

### BE

### FE

## Deployment

### Docker

### Github actions

### Git

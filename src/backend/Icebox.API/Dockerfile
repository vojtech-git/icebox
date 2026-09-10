# Stage 1: Build the application using the .NET SDK
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy solution and project files first (for better dependency caching)
COPY ["Icebox.API/Icebox.API.csproj", "Icebox.API/"]
COPY ["Icebox.Application/Icebox.Application.csproj", "Icebox.Application/"]
COPY ["Icebox.Domain/Icebox.Domain.csproj", "Icebox.Domain/"]
COPY ["Icebox.Infrastructure/Icebox.Infrastructure.csproj", "Icebox.Infrastructure/"]

# Restore NuGet packages
RUN dotnet restore "Icebox.API/Icebox.API.csproj"

# Copy the remaining source code and build
COPY . .
WORKDIR "/src/Icebox.API"
RUN dotnet publish "Icebox.API.csproj" -c Release -o /app/publish

# Stage 2: Run the application using the smaller runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Expose port 8080
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "Icebox.API.dll"]
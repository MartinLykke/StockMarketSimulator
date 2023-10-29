# Use the official .NET SDK image as a build stage.
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /app

# Copy the project file and restore dependencies.
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the application code.
COPY . ./

# Build the application for release.
RUN dotnet publish -c Release -o out

# Use the official ASP.NET Core runtime image as the final base layer.
FROM mcr.microsoft.com/dotnet/aspnet:7.0

WORKDIR /app

# Copy the published application from the build stage.
COPY --from=build /app/out .

# Expose the port your application listens on (adjust if necessary).
EXPOSE 80

# Set the entry point for your application.
ENTRYPOINT ["dotnet", "SmsBackend.dll"]

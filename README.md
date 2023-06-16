# MedFluffy Backend

## Overview
This repository contains backend application projects used in MedFluffy mobile application (Android). There are several APIs that we build into multiple endpoints such as Pet Disease Detection and -----.

We use JavaScript programming language with Node.js environment. For the framework, we use Express because this framework is used to design and build webservice applications (RESTful API) quickly and easily.

## Contributors
| Name | Bangkit ID | GitHub |
| ------ | ------ | ------ |
| Rahmadina | C137DSY1652 | [![github-follow][github-follow-dina]][github-dina] |
| Fikri Aldi Dwi Putro | C013DSX2789 | [![github-follow][github-follow-aldi]][github-aldi] |

## Requirements
- Code Editor ([Visual Studio Code] prefferable)
- [Node.js]
- [Postman]

## Project Installation
1. Clone the repository
```bash
git clone https://github.com/Tandur-Team/tandur-backend.git
```
2. Open the project directory on terminal
```bash
cd PROJECT_DIRECTORY
```
4. Install all required dependencies
```bash
npm install
```

## Run The Application
Open Command Prompt/Powershell and type:
```bash
cd PROJECT_DIRECTORY
npm run start
```

## API Endpoints
- **POST** '/user/signup' : This endpoint allow user to register to the app and save user data to MySQL
- **POST** '/user/login' : This endpoint allow user to login and get the Bearer token response for the apps.
- **POST** '/user/email_check' : This endpoint allow user to login and get the Bearer token for the apps.
- **GET** '/user/' : This endpoint response all users list with JSON format.
- **GET** '/user/<user_id>' : This endpoint response user details with JSON format.
- **POST** '/user/<user_id>/plant' : This endpoint allow user to create My Plants.
- **GET** '/user/<user_id>/plant' : This endpoint response all My Plants list with JSON format.
- **GET** '/user/<user_id>/plant/search?search=<query_search>' : This endpoint response queried My Plants with JSON format.
- **GET** '/user/<user_id>/plant/<plant_id>' : This endpoint response My Plant details with JSON format.
- **PATCH** '/user/<user_id>/plant/<plant_id>' : This endpoint update 'is_harvested' to TRUE.
- **GET** '/plant/?zone_local=<kecamatan>&zone_city=<kota>' : This endpoint response nearby plants list with JSON format.
- **GET** '/plant/search?search=<query_search>&zone_local=<kecamatan>&zone_city=<kota>' : This endpoint response queried nearby plants list with JSON format.
- **GET** '/plant/<plant_name>?zone_local=<kecamatan>&zone_city=<kota>&lat=<lat>long=<log>' : This endpoint response plant survival rate prediction.
- **GET** '/weather/?lat=<lat>&long=<long> : This endpoint response current weather.

## Test The Application
1. Run the application (Check 'Run The Application' section)
2. Your application should be running on 127.0.0.1:8080/
3. Open POSTMAN
4. Set the method you want to test (Check 'API Endpoints' section), e.g GET
5. Set http://127.0.0.1:8080/ as the base URL.
6. Add endpoint on the end of base URL, e.g http://127.0.0.1:8080/plant/
7. Click Send
8. You should get a JSON response

## Deploy The Application to Cloud Run (Google Cloud Platform)
1. Create Artifact Registry
```bash
gcloud artifacts repositories create tandur-repo --repository-format=docker --location=asia-southeast2 --description="Tandur docker repository"
```
2. Create Cloud Build Triggers
```bash
gcloud beta builds triggers create github --repo-name=tandur-repo \
--repo-owner=YOUR_GITHUB_USERNAME \
--branch-pattern=^master$ \
--build-config=cloudbuild.yaml \
--name=tandur-cicd
```
3. Create commit to ``master`` branch to trigger the build, test, and deployment to Cloud Run

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[JavaScript]: https://www.javascript.com/
[Visual Studio Code]: https://code.visualstudio.com/
[Node.js]: https://nodejs.org/en/
[Postman]: https://www.postman.com/

[github-dina]: https://github.com/rhmdin
[github-aldi]: https://github.com/fikrialdi10

[github-follow-dina]: https://img.shields.io/github/followers/rhmdin?style=social
[github-follow-aldi]: https://img.shields.io/github/followers/fikrialdi10?style=social

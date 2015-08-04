
## Wave Software Development Challenge
This repository consists of three simple projects to demonstrate a possible solution. The client just consumes the api that is provided independently by two separate implementaion of the service. To some extent it has been tried to generalize the cvs import functionality. In addition to basic debug messages, error handling should be more extensive and is not complete yet.

**AngularJS Client - Deployed on Azure**

A basic client in AngularJS that consumes back-end services whick can be switched through the user interface. 

Components: angular, ui-router, bootstrap, jquery, font-awesome, ng-file-upload
- Alternate Source code: https://github.com/omidmafi/wave.ng/
- Demo: http://ngwave.azurewebsites.net

**Nodejs / PostgreSQL Service - Deployed on Heroku**

A nodejs implementaion for the required service. 

Modules: *express*, *moment* for date manipulation, *multer* for file upload, pg to access postgres, *uuid* just for additional guid generation (not necessary)
- Alternate Source code: https://github.com/omidmafi/wave.node/
- Demo https://lit-savannah-4000.herokuapp.com/


**.NET WebAPI / SQL Server - Deployed on Azure**

A .NET WebAPI implementaion for the required service. 

Nugets: WebAPI, JSON, EF 6.1.3 
- Alternate Source code: https://github.com/omidmafi/wave.net/
- Demo: http://wavenetapi.azurewebsites.net/


That is! As I see the result, it is not too bad!

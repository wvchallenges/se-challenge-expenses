rem Remove previous code package
del ..\ZipKits\getUrl.zip

rem Create new code package using the 7-Zip utility
7z a  -r ..\ZipKits\getUrl.zip .

rem Install new code package in Lambda using the AWS CLI
aws lambda update-function-code --publish --function-name=getUrl --zip-file fileb://../ZipKits/getUrl.zip

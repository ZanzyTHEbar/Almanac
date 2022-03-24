#!/bin/sh

printf "============================================================\n"
printf "Starting setup to create the .env variables file...\n"
printf "In the following, you will be asked for mandatory (ond optional) information\n"
printf "that is required to setup the environment.\n"
printf "Please make sure that you have the following information (if needed) before you continue:\n"
printf "\033[0;31mAlso Note that tokens should never be shared with anyone\033[0m\n"

# Main Application variables, needed at all cost
printf "\033[0;35m[Required by Application]\033[0m - "
printf "Hostname and Port where your application should run\n"

# Microsoft Graph API variables, required for the application
printf "\033[0;35m[Required by Microsoft]\033[0m - "
printf "Microsoft Graph API client ID, your API Client secret and your main Servers Redirect URI's\n" 

# Redirect URI variables, required for Microsoft Graph API
printf "\033[0;35m[Required by Azure Active Directory]\033[0m - "
printf "Redicrect URI's for Azure Active Directory to correctly redirect to your application - "
printf "\033[0;31mWARN: You must first set this up with your Azure Active Directory\033[0m\n"
printf "\033[0;36mNote: You will require admin access to your Organisations Microsoft Account, or be given permissions to access the Azure Active Directory\033[0m\n"
printf "\033[0;36mNote: in order to create a new application registration\033[0m\n"

# DLNA variables, optional
printf "\033[0;35m[Required by DLNA Server]\033[0m - "
printf "DLNA Auth Token - "
printf "\033[0;31mWARN: NOT YET IMPLEMENTED\033[0m\n"

# Azure Active Storage variables, recommended
printf "\033[0;35m[Required by Azure Active Storage]\033[0m - "
printf "Microsoft Azure Storage Auth token - "
printf "\033[0;31mWARN: NOT YET IMPLEMENTED\033[0m\n"

read -p "If all the needed information is at hand press enter to continue..."
# Create .env file
env_path="../App/sh.env"
touch ${env_path}
echo -e "#dotenv file - stores all app variables/flags" > ${env_path}
printf "\033[0;36mNote:To use the default values, just press enter\033[0m\n"

printf "Hostname Setter Service Creator Started\n"
sudo cp hostname.sh /usr/bin/hostname.sh
printf "Moved hostname.sh to /usr/bin\n"
sudo chmod +x /usr/bin/hostname.sh
printf "Applied permissions to hostname.sh\n"

printf "Creating service file\n"
sudo touch /etc/systemd/system/hostname.service
sudo cat .service.txt > /etc/systemd/system/hostname.service
printf "Created service file\n"

cat /etc/systemd/system/hostname.service

sudo systemctl daemon-reload
printf "Reloaded systemd\n"
sudo systemctl enable hostname.service
printf "Enabled hostname.sh\n"
sudo systemctl start hostname.service
printf "Hostname Setter Service Created, continuing with setup\n"

# Set Aplication Variables
read -p "Please enter the hostname (ip) where your application should run (default: picalendar):" app_ip
printf "Changing Hostname\n"
if [ -z "$app_ip" ]
then
    app_ip="picalendar"
    printf "You have chosen the default hostname\n"
fi
sudo hostname.sh $app_ip
printf "Hostname Changed to: \033[0;36m$app_ip\033[0m\n"

read -p "Please enter the port where your application should run (default: 2070):" app_port

if [ -z "$app_port" ]
then
    app_port="8080"
fi
echo -e "APP_PORT=${app_port}" >> ${env_path}
printf "\033[0;32mYour application will now run on: \"http://${app_ip}:${app_port}/\"\033[0m\n";

# Microsoft Graph API settings
read -p "Do you want to use the Microsoft Graph API? (y/n):" microsoft
# if microsoft is y
if [ "$microsoft" = "y" || "$microsoft" = "Y" ]
then
    read -p "Please enter your Microsoft Graph API Auth Client ID:" microsoft_client_id
    echo -e "OAUTH_CLIENT_ID=${microsoft_client_id}" >> ${env_path}
    read -p "Please enter your Microsoft Graph API ClientID Secret:" microsoft_client_secret
    echo -e "OAUTH_CLIENT_SECRET=${microsoft_client_secret}" >> ${env_path}
    read -p "Please enter your Microsoft Graph API Redirect URI for LocalHost:" microsoft_redirect_uri
    echo -e "OAUTH_REDIRECT_URI_LOCALHOST=${microsoft_redirect_uri}" >> ${env_path}
    read -p "Please enter your Microsoft Graph API Redirect URI for Secure LocalHost:" microsoft_redirect_uri_secure_localhost
    echo -e "OAUTH_REDIRECT_URI_LOCALHOST_SECURE=${microsoft_redirect_uri_secure_localhost}" >> ${env_path}
    read -p "Please enter your Microsoft Graph API Redirect URI for Custom DNS:" microsoft_redirect_uri_custom_dns
    echo -e "OAUTH_REDIRECT_URI=${microsoft_redirect_uri_custom_dns}" >> ${env_path}
    read -p "Please enter your Microsoft Graph API Redirect URI for Secure Custom DNS:" microsoft_redirect_uri_secure_custom_dns
    echo -e "OAUTH_REDIRECT_URI_SECURE=${microsoft_redirect_uri_secure_custom_dns}" >> ${env_path}
    printf "\033[0;32mGenerating non-user related values for Microsoft Graph API\033[0m\n";
    echo -e "OAUTH_AUTHORITY=https://login.microsoftonline.com/common" >> ${env_path}
    echo -e "OAUTH_SCOPES='user.read,calendars.readwrite,mailboxsettings.read'" >> ${env_path}
    echo -e "CALLBACK=/auth/callback" >> ${env_path}
    printf "\033[0;32mMicrosoft Graph API settings have been set\033[0m\n";
fi

# DLNA settings
read -p "Do you want to use the DLNA server? (y/n):" dlna
if [ "$dlna" = "y" || "$dlna" = "Y" ]
then
    printf "Please enter the DLNA IP and credentials:"
    read -p "DLNA IP:" dlna_ip
    
    printf "\033[0;33mCustom DLNA server stored at ${dlna_path}\033[0m\n"
    echo -e "DLNA_CUSTOM=true" >> ${env_path}
    echo -e "DLNA_DIALECT=${dlna_ip}" >> ${env_path}
    read -p "Please enter the hostname (ip) where your DLNA is running:" db_host
    echo -e "DLNA_HOST=${dlna_host}" >> ${env_path}
    read -p "Please enter the port where your DLNA is running:" db_port
    echo -e "DLNA_PORT=${dlna_port}" >> ${env_path}
    read -p "Please enter the DLNA name:" db_name
    echo -e "DLNA_NAME=${dlna_name}" >> ${env_path}
    read -p "Please enter the DLNA username:" db_user
    echo -e "DLNA_USER=${dlna_user}" >> ${env_path}
    read -p "Please enter the DLNA password:" db_pass
    echo -e "DLNA_PASS=${dlna_pass}" >> ${env_path}
    printf "\033[0;33mUsing custom DLNA at \"${dlna_ip}://${db_user}:${db_pass}@${db_host}:${db_port}/${db_name}\"\033[0m\n"
fi

# Azure Storage setting
printf "Do you want to use the Microsoft Azure Storage Services? (y/n):"
read azure
if [ "$azure" = "y" ]
then
    read -p "Please enter your azure Auth Token:" azure_token
    echo -e "azure_TOKEN=${azure_token}" >> ${env_path}
fi

if [ -f "$env_path" ]
then
    printf "\033[0;32mSuccessfully created .env file\033[0m\n"
    printf "\033[0;32mInitial Setup Complete, to complete the setup the script will now reboot your device.\033[0m\n"
    sleep 5
    sudo reboot
    exit 1
else
    printf "\033[0;31mFailed to create .env file\033[0m\n"µ
    printf "\033[0;31mPlease check the permissions of the file and try again.\033[0m\n"
    printf "\033[0;31mIf this issue persists, please manually create a .env file (named .env) in your /App directory.\033[0m\n"
    exit 1
fi

printf "============================================================"
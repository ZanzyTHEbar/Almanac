from time import sleep as zzz
from colorama import Fore, Style

# print ascii art logo
def welcome():
    print(f" {Fore.MAGENTA}")
    print(r"""

 _____ _____ _____      _                _            
|  __ \_   _/ ____|    | |              | |           
| |__) || || |     __ _| | ___ _ __   __| | __ _ _ __ 
|  ___/ | || |    / _` | |/ _ \ '_ \ / _` |/ _` | '__|
| |    _| || |___| (_| | |  __/ | | | (_| | (_| | |   
|_|   |_____\_____\__,_|_|\___|_| |_|\__,_|\__,_|_|   """)
    print(f" {Style.RESET_ALL}")
    print(f"{Fore.BLUE}Welcome to the setup script for the OutLook Knight Project{Style.RESET_ALL}")
    print(f"{Fore.YELLOW}This script will install all the necessary packages and setup the project to run{Style.RESET_ALL}")
    zzz(5)
    
if __name__ == '__main__':
    welcome()
    quit()
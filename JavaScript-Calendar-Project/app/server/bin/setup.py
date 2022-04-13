# MUST SUDO FOR THIS TO WORK - ELSE PERMISSION DENIED

import json
import subprocess as s
import os
from pathlib import Path
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
    print(f"{Fore.GREEN}This script will install all the necessary packages and setup the project to run{Style.RESET_ALL}")
    zzz(5)


def run_fast_scandir(dir):    # dir: str, ext: list
    subfolders = []

    for f in os.scandir(dir):
        if f.is_dir():
            subfolders.append(f.path)

    for dir in list(subfolders):
        sf = run_fast_scandir(dir)
        subfolders.extend(sf)
    return subfolders


def createConfigJSONFile():
    # use user input to dynamically create config.json file
    # with the following settings:
    #   - description
    #   - scopes {Database, DLNA, MSCAL, GOOGLECAL}
    #   - elog {level, cLogEnabled, dLogEnabled, eLogEnabled, fLogEnabled, utilPath, filePath}
    temp = {
        "scopes": {
            "Database": False,
            "DLNA": False,
            "MSCAL": False,
            "GOOGLECAL": False
        },
        "elog": {
            "level": 0,
            "cLogEnabled": False,
            "dLogEnabled": False,
            "eLogEnabled": False,
            "fLogEnabled": False,
            "utilPath": "",
            "filePath": ""
        }
    }

    configPath = Path(__file__).parent

    relative_path = '../server/scopes/utils'
    relative_path_2 = '../../app'
    relative_path_3 = '../server/scopes/'

    src_path = (configPath / relative_path).resolve()
    src_path_2 = (configPath / relative_path_2).resolve()
    src_path_3 = (configPath / relative_path_3).resolve()

    temp["elog"]["utilPath"] = str(src_path)
    temp["elog"]["filePath"] = str(src_path_2 / "Logs/")

    completeName = str(src_path / "config.json")

    subfolders = run_fast_scandir(src_path_3)
    
    print(f"{Fore.GREEN}The following subfolders were found in the scopes folder{Style.RESET_ALL}")
    for folder in subfolders:
        print(f"{Fore.GREEN}{folder}{Style.RESET_ALL}")

    print(f"{Fore.BLUE}Please enter the following information to create the config.json file{Style.RESET_ALL}")
    print(f"{Fore.BLUE}Please choose the modules to enable (0 or 1 only).{Style.RESET_ALL}")
    print(f"{Fore.GREEN}Enable Database Module?{Style.RESET_ALL}")
    temp["scopes"]["Database"] = bool(int(input()))
    print(f"{Fore.GREEN}Enable DLNA Client Module?{Style.RESET_ALL}")
    temp["scopes"]["DLNA"] = bool(int(input()))
    print(f"{Fore.GREEN}Enable Microsoft Calendar Module?{Style.RESET_ALL}")
    temp["scopes"]["MSCAL"] = bool(int(input()))
    print(f"{Fore.GREEN}Enable Google Calendar Module?{Style.RESET_ALL}")
    temp["scopes"]["GOOGLECAL"] = bool(int(input()))
    print(f"{Fore.BLUE}Please enter the elog level (a number between 0 and 10){Style.RESET_ALL}")
    temp["elog"]["level"] = int(input())
    print(f"{Fore.BLUE}Please choose the logging modules to enable (0 or 1 only).{Style.RESET_ALL}")
    print(f"{Fore.GREEN}Enable the elog cLogEnabled module?{Style.RESET_ALL}")
    temp["elog"]["cLogEnabled"] = bool(int(input()))
    print(f"{Fore.GREEN}Enable the elog dLogEnabled module?{Style.RESET_ALL}")
    temp["elog"]["dLogEnabled"] = bool(int(input()))
    print(f"{Fore.GREEN}Enable the elog eLogEnabled module?{Style.RESET_ALL}")
    temp["elog"]["eLogEnabled"] = bool(int(input()))
    print(f"{Fore.GREEN}Enable the elog fLogEnabled module?{Style.RESET_ALL}")
    temp["elog"]["fLogEnabled"] = bool(int(input()))

    with open(completeName, "w") as outfile:
        json.dump(temp, outfile)


def setupServer():
    chmod_setup = "sudo chmod +x setup.sh".split()
    s.run(
        chmod_setup,
        stdout=s.PIPE,
    )
    s.call(['sh', './setup.sh'])


def getRotationSettings(argument):
    switcher = {
        0: ".rotatelcd0.txt",
        1: ".rotatelcd1.txt",
        2: ".rotatelcd2.txt",
        3: ".rotatelcd3.txt",
    }

    # get() method of dictionary data type returns
    # value of passed argument if it is present
    # in dictionary otherwise second argument will
    # be assigned as default value of passed argument
    return switcher.get(argument, "nothing")


def rotateScreen():
    s.call(['sudo', 'cp', '/boot/config.txt', '/boot/config.txt.bak'])
    # request user input
    # if input is "y"
    #   rotate screen
    # else
    #   exit function
    print(f"{Fore.YELLOW}Would you like to rotate the screen? (y/n)\n")
    rotate_screen = input()
    if rotate_screen == "y" or rotate_screen == "Y":
        print(
            f"How many degrees? (0-3), 0 is to reset and 3 is 270°. Please use a space to separate answers{Style.RESET_ALL}.\n")
        degrees = input()
        print(f"{Fore.GREEN}Your degrees setting{Style.RESET_ALL}", degrees)
        print(f"{Fore.BLUE}Continuing with setup, setting up rotation{Style.RESET_ALL}")
        rotation_settings = getRotationSettings(degrees)
        s.call(['sudo', 'cat', '/boot/config.txt.bak', '>', '/boot/config.txt'])
        # rotate the screen and touch input: options are "0" "1" "2" "3" - from 0 to 270 degrees of rotation
        s.call(['sudo', 'cat', rotation_settings, '>>', '/boot/config.txt'])

        print(f"{Fore.YELLOW}Screen rotation has been set, please wait until setup completes to reboot{Style.RESET_ALL}")
    else:
        print(
            f"{Fore.YELLOW}Continuing with setup without rotating the screen{Style.RESET_ALL}")


def setupChromium():
    chmod_chromium_start_script = "sudo chmod +x ../setupchromium.sh".split()
    s.run(
        chmod_chromium_start_script,
        stdout=s.PIPE,
    )
    print(f"{Fore.YELLOW}Chromium permissions setup complete{Style.RESET_ALL}")


def checkPackages():
    # apt list --installed | grep name
    # dpkg -l | grep name
    # apt search name
    # [[ $(dpkg -s bzip2 | grep Status) =~ "ok" ]] && echo "inst" || echo "not inst"
    modules_dict = {'chromium-browser', 'matchbox-window-manager',
                    'xautomation', 'unclutter', 'xserver-org', 'xinit', 'x11-xserver-utils'}
    for module in modules_dict:
        print(module)
        check_packages = "[[ $(dpkg -s " + module + \
            "| grep Status) =~ \"ok\" ]] && echo \"inst\" || echo \"not inst\"".split(
            )
        proc4 = s.run(
            check_packages,
            stdout=s.PIPE,
        )
        if proc4 is "not inst":
            print("Installing " + module)
            s.call(['apt', 'install', module + " -y"])
            zzz(3)
            print(module + " is now installed")
            print("Continuing with setup, setting up Chromium")
            setupChromium()
        else:
            print(module + " is installed")
            print("Continuing with setup, setting up Chromium")
            setupChromium()
        zzz(5)


def setupKiosk():
    chmod_kiosk_start_script = "sudo chmod +x kiosk.sh".split()
    s.run(
        chmod_kiosk_start_script,
        stdout=s.PIPE,
    )
    s.call(['cp', 'kiosk.sh', '~/kiosk.sh'])
    s.call(['cat', '.setupkiosk.txt', '>>', '~/.bashrc'])
    print("{Fore.YELLOW}Kiosk script added to the bashrc file.{Style.RESET_ALL}")


if __name__ == '__main__':
    welcome()
    createConfigJSONFile()
    checkPackages()
    setupKiosk()
    rotateScreen()
    setupServer()
    quit()

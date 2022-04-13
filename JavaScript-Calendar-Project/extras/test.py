import json
import re
import subprocess as s
import os
from pathlib import Path
from time import sleep as zzz
from colorama import Fore, Style

# print ascii art logo


def welcome():
    print(f"{Fore.MAGENTA} ")
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


def scandir(path):    # dir: str, ext: list
    subfolders = []

    for f in os.scandir(path):
        if f.is_dir():
            subfolders.append(f.path)

    """ for path in list(subfolders):
        subfol = scandir(path)
        subfolders.extend(subfol) """
    return subfolders


def createConfigJSONFile():
    # use user input to dynamically create config.json file
    # with the following settings:
    #   - description
    #   - scopes {Database, DLNA, MSCAL, GOOGLECAL}
    #   - elog {level, cLogEnabled, dLogEnabled, eLogEnabled, fLogEnabled, utilPath, filePath}
    json_file = {
        "scopes": {
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

    relative_path = '../app/server/scopes/utils'
    relative_path_2 = '../app'
    relative_path_3 = '../app/server/scopes/'

    src_path = (configPath / relative_path).resolve()
    src_path_2 = (configPath / relative_path_2).resolve()
    src_path_3 = (configPath / relative_path_3).resolve()

    json_file["elog"]["utilPath"] = str(src_path)
    json_file["elog"]["filePath"] = str(src_path_2 / "Logs/")

    completeName = str(src_path / "config.json")

    subfolders = scandir(src_path_3)

    # print(f"{Fore.GREEN}The following subfolders were found in the scopes folder{Style.RESET_ALL}")
    print(
        f"{Fore.BLUE}Please enter the following information to create the config.json file{Style.RESET_ALL}")
    print(
        f"{Fore.BLUE}Please choose the modules to enable (0 or 1 only).{Style.RESET_ALL}")
    for folder in subfolders:
        temp = []
        temp.append(folder.split("scopes\\")[-1])
        # print(f"{Fore.GREEN}{temp}{Style.RESET_ALL}")
        for i in list(temp):
            temp = i.split("\\")[-1]
            # check if temp_2 has lowercase letters
            if any(u.isupper() for u in list(temp)):
                temp = temp

                print(f"{Fore.GREEN}Found the scope: {Style.RESET_ALL}")
                print(f"{Fore.GREEN}{temp}{Style.RESET_ALL}")
                print(f"{Fore.GREEN}Enable {temp} Module?{Style.RESET_ALL}")
                json_file["scopes"][temp] = bool(int(input()))

    print(f"{Fore.BLUE}Please enter the elog level (a number between 0 and 10){Style.RESET_ALL}")
    json_file["elog"]["level"] = int(input())
    print(f"{Fore.BLUE}Please choose the logging modules to enable (0 or 1 only).{Style.RESET_ALL}")
    print(f"{Fore.GREEN}Enable the elog cLogEnabled module?{Style.RESET_ALL}")
    json_file["elog"]["cLogEnabled"] = bool(int(input()))
    print(f"{Fore.GREEN}Enable the elog dLogEnabled module?{Style.RESET_ALL}")
    json_file["elog"]["dLogEnabled"] = bool(int(input()))
    print(f"{Fore.GREEN}Enable the elog eLogEnabled module?{Style.RESET_ALL}")
    json_file["elog"]["eLogEnabled"] = bool(int(input()))
    print(f"{Fore.GREEN}Enable the elog fLogEnabled module?{Style.RESET_ALL}")
    json_file["elog"]["fLogEnabled"] = bool(int(input()))

    with open(completeName, "w") as outfile:
        json.dump(json_file, outfile)


if __name__ == '__main__':
    welcome()
    createConfigJSONFile()
    quit()

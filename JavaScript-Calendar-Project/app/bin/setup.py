# MUST SUDO FOR THIS TO WORK - ELSE PERMISSION DENIED

import subprocess as s
from time import sleep as zzz
from colorama import Fore, Style


def setupServer():
    chmod_setup = "sudo chmod +x setup.sh".split()
    s.run(
        chmod_setup,
        stdout=s.PIPE,
    )
    s.call(['sh', './setup.sh'])
    print("{FORE.BLUE}Setup complete, system will reboot to complete setup{STYLE.RESET_ALL}")


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
    rotate_screen, degrees = input("{FORE.YELLOW}Would you like to rotate the screen? (y/n)" + "\n" +
                                   "How many degrees? (0-3), 0 is to reset and 3 is 270°. Please use a space to separate answers.{STYLE.RESET_ALL}" + "\n").split()
    print("{FORE.BLUE}Your choice to rotate screen{STYLE.RESET_ALL}", rotate_screen)
    print("{FORE.GREEN}Your degrees setting{STYLE.RESET_ALL}", degrees)
    print("{FORE.BLUE}Continuing with setup, setting up rotation{STYLE.RESET_ALL}")
    if rotate_screen == "y" or rotate_screen == "Y":
        rotation_settings = getRotationSettings(degrees)
        s.call(['sudo', 'cat', '/boot/config.txt.bak', '>', '/boot/config.txt'])
        # rotate the screen and touch input: options are "0" "1" "2" "3" - from 0 to 270 degrees of rotation
        s.call(['sudo', 'cat', rotation_settings, '>>', '/boot/config.txt'])

        print("{FORE.YELLOW}Screen rotation has been set, please wait until setup completes to reboot{STYLE.RESET_ALL}")
    else:
        print("{FORE.YELLOW}Continuing with setup without rotating the screen{STYLE.RESET_ALL}")


def setupChromium():
    chmod_chromium_start_script = "sudo chmod +x ../setupchromium.sh".split()
    s.run(
        chmod_chromium_start_script,
        stdout=s.PIPE,
    )
    print("{FORE.YELLOW}Chromium permissions setup complete{STYLE.RESET_ALL}")


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
    print("{FORE.YELLOW}Kiosk script added to the bashrc file.{STYLE.RESET_ALL}")


if __name__ == '__main__':
    checkPackages()
    setupKiosk()
    rotateScreen()
    setupServer()
    quit()

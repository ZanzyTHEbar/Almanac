# MUST SUDO FOR THIS TO WORK - ELSE PERMISSION DENIED

import subprocess as s
from time import sleep as zzz


def setupServer():
    chmod_setup = "sudo chmod +x setup.sh".split()
    proc1 = s.run(
        chmod_setup,
        stdout=s.PIPE,
    )
    proc1
    s.call(['sh', './setup.sh'])
    print("Setup complete")

    
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
    rotate_screen, degrees = input("Would you like to rotate the screen? (y/n)" + "\n" + "How many degrees? (0-3), 0 is to reset and 3 is 270°. Please use a space to separate answers." + "\n").split()
    print("Your choice to rotate screen", rotate_screen)
    print("Your degrees setting", degrees)
    if rotate_screen == "y" or rotate_screen == "Y":
        rotation_settings = getRotationSettings(degrees)
        s.call(['sudo','cat', '/boot/config.txt.bak', '>', '/boot/config.txt']) 
        s.call(['sudo','cat', rotation_settings, '>>', '/boot/config.txt']) # rotate the screen and touch input: options are "0" "1" "2" "3" - from 0 to 270 degrees of rotation
        
        print("Screen rotation has been set, please wait until setup completes to reboot")
    else:
        print("Continuing with setup")
        pass


def setupChromium():
    chmod_chromium_start_script = "sudo chmod +x setupchromium.sh".split()
    proc2 = s.run(
        chmod_chromium_start_script,
        stdout=s.PIPE,
    )
    proc2
    print("chromium permissions setup complete")


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
        proc4
        if proc4 is "not inst":
            print("Installing " + module)
            s.call(['apt', 'install', module + " -y"])
        else:
            print(module + " is installed")
            setupChromium()
        zzz(5)


def setupKiosk():
    chmod_kiosk_start_script = "sudo chmod +x kiosk.sh".split()
    proc3 = s.run(
        chmod_kiosk_start_script,
        stdout=s.PIPE,
    )
    proc3
    s.call(['cp', 'kiosk.sh', '~/kiosk.sh'])
    s.call(['cat', '.setupkiosk.txt', '>>', '~/.bashrc'])
    print("Kiosk script added to the bashrc file. Setup complete")


if __name__ == '__main__':
    checkPackages()
    setupKiosk()
    setupServer()
    zzz(5)
    quit()

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


def setupChromium():
    chmod_chromium_start_script = "sudo chmod +x setupchromium.sh".split()
    proc2 = s.run(
        chmod_chromium_start_script,
        stdout=s.PIPE,
    )
    proc2


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
        zzz(1)


def setupKiosk():
    chmod_kiosk_start_script = "sudo chmod +x kiosk.sh".split()
    proc3 = s.run(
        chmod_kiosk_start_script,
        stdout=s.PIPE,
    )
    proc3
    s.call(['cp', 'kiosk.sh', '/home/pi/kiosk.sh'])
    s.call(['cat', 'setupkiosk.txt', '>>', '~/.bashrc'])
    print("Kiosk script added to the bashrc file. Setup complete")


if __name__ == '__main__':
    setupServer()
    checkPackages()
    zzz(5)
    setupKiosk()
    zzz(5)
    quit()

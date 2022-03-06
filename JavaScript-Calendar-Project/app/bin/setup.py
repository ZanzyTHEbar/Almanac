import subprocess as s
from time import sleep as zzz
from getpass import getpass


def setupServer():
    chmod_setup = "sudo chmod +x setup.sh".split()
    proc1 = s.run(
        chmod_setup,
        stdout=s.PIPE,
        input=getpass("password: "),
        encoding="ascii",
    )
    proc1
    s.call(['sh', './setup.sh'])


def setupChromium():
    chmod_chromium_start_script = "sudo chmod +x setupchromium.sh".split()
    proc2 = s.run(
        chmod_chromium_start_script,
        stdout=s.PIPE,
        input=getpass("password: "),
        encoding="ascii",
    )
    proc2


def setupKiosk():
    chmod_kiosk_start_script = "sudo chmod +x kiosk.sh".split()
    proc3 = s.run(
        chmod_kiosk_start_script,
        stdout=s.PIPE,
        input=getpass("password: "),
        encoding="ascii",
    )
    proc3
    s.call(['cp', 'kiosk.sh', '/home/pi/kiosk.sh'])
    s.call(['cat', 'setupkiosk.txt', '>>', '~/.bashrc'])
    print("Kiosk script added to the bashrc file. Setup complete")


if __name__ == '__main__':
    setupServer()
    zzz(120)
    setupChromium()
    zzz(5)
    setupKiosk()
    zzz(5)
    quit()

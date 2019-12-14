#!/bin/bash -e

SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"

showhelp() {
    echo "Usage: bash runserver [options]
    -h, --help, -?
                Display usage information
    -s, --skip-setup
		Skip setup steps and run the application
    -p PORT, --port PORT
        Specify a port to run the application on"
    exit 0
}

skip_setup="f"
port=8000

bold=$(tput bold)
normal=$(tput sgr0)
green=$(tput setf 2)

while :; do
    case "$1" in
        --help)
            showhelp
            ;;
        --skip-setup)
            skip_setup="t"
            ;;
        --port)
            if [ "$2" ]; then
                port=$2
                shift 2
                continue
            else
                echo 'ERROR: Must specify a non-empty "--port PORT" argument.' >&2
                exit 1
            fi
            ;;
        --)
            shift
            break
            ;;
        -?*)
            for ((i = 1; i < ${#1}; i++)); do
                case "${1:$i:1}" in
                    h|\?)
                        showhelp
                        ;;
                    s)
                        skip_setup="t"
                        ;;
                    p)
                        if [ "$2" ]; then
                            port=$2
                            continue
                        else
                            echo 'ERROR: Must specify a non-empty "-p PORT" argument.' >&2
                            exit 1
                        fi
                        ;;
                    *)
                        echo "$0: error - unrecognized option '${1:$i:1}'" >&2;
                        echo "Try 'runserver --help' for more information."
                        exit 1
                esac
            done
            ;;
        *)
            break
    esac
    shift
done

if [ "$skip_setup" = "f" ]; then
    if [[ $EUID -ne 0 ]]; then
        echo "You need to run as root (${bold}sudo bash runserver.sh${normal}) to install dependencies!"
        echo "If you already have all the dependencies installed, you can run ${bold}bash runserver.sh -s${normal}"
        exit 1
    fi

    apt-get -y --force-yes install python
    pip install Django==1.9
    echo -e "\n${bold}Use --skip-setup or -s to ignore initial setup next time.${normal}"
fi

python ${SCRIPT_DIR}/wvchallenge/manage.py makemigrations expenses
python ${SCRIPT_DIR}/wvchallenge/manage.py migrate

echo -e "\n${green}${bold}Visit http://localhost:${port}/ in your browser to use the application.${normal}"
echo -e "\n--------------------------------------------\n"

python ${SCRIPT_DIR}/wvchallenge/manage.py runserver ${port} --insecure

## Задание 1 - Docker CLI

1. Загрузите образ `busybox` последней версии
   ```sh
   docker pull busybox:latest
   ```
   ```
   latest: Pulling from library/busybox
   45d8eb5967de: Pull complete 
   Digest: sha256:650fd573e056b679a5110a70aabeb01e26b76e545ec4b9c70a9523f2dfaf18c6
   Status: Downloaded newer image for busybox:latest
   docker.io/library/busybox:latest
   
   What's Next?
     View a summary of image vulnerabilities and recommendations → docker scout quickview busybox:latest
   ```
2. Запустите новый контейнер `busybox` с командой `ping` сайта `netology.ru`, и количеством пингов 7, поименуйте контейнер `pinger`
   ```sh
   docker run -d --name pinger busybox ping -c 7 netology.ru
   ```
   ```
   04087be3987098142c486f2fef19a4a7e6ac6a8241051d7a5cde6988be3da005
   ```
3. Выведите на список всех контейнеров - запущенных и остановленных
   ```sh
   docker ps -a
   ```
   ```
   CONTAINER ID   IMAGE                                 COMMAND                  CREATED          STATUS                      PORTS                    NAMES
   04087be39870   busybox                               "ping -c 7 netology.…"   28 seconds ago   Exited (0) 20 seconds ago                            pinger
   ```
4. Выведите на экран логи контейнера с именем `pinger`
   ```sh
   docker logs pinger
   ```
   ```
   PING netology.ru (104.22.40.171): 56 data bytes
   64 bytes from 104.22.40.171: seq=0 ttl=63 time=105.824 ms
   64 bytes from 104.22.40.171: seq=1 ttl=63 time=111.044 ms
   64 bytes from 104.22.40.171: seq=2 ttl=63 time=109.741 ms
   64 bytes from 104.22.40.171: seq=3 ttl=63 time=101.532 ms
   64 bytes from 104.22.40.171: seq=4 ttl=63 time=101.821 ms
   64 bytes from 104.22.40.171: seq=5 ttl=63 time=103.428 ms
   64 bytes from 104.22.40.171: seq=6 ttl=63 time=103.055 ms
   
   --- netology.ru ping statistics ---
   7 packets transmitted, 7 packets received, 0% packet loss
   round-trip min/avg/max = 101.532/105.206/111.044 ms
   ```
5. Запустите второй раз контейнера с именем `pinger`
   ```sh
   docker start pinger
   ```
   ```
   pinger
   ```
6. Выведите на список всех контейнеров - запущенных и остановленных
   ```sh
   docker ps -a
   ```
   ```
   CONTAINER ID   IMAGE                                 COMMAND                  CREATED         STATUS                      PORTS                    NAMES
   04087be39870   busybox                               "ping -c 7 netology.…"   2 minutes ago   Exited (0) 26 seconds ago                            pinger
   ```
7. Выведите на экран логи контейнера с именем `pinger`
   ```sh
   docker logs pinger
   ```
   ```
   PING netology.ru (104.22.40.171): 56 data bytes
   64 bytes from 104.22.40.171: seq=0 ttl=63 time=105.824 ms
   64 bytes from 104.22.40.171: seq=1 ttl=63 time=111.044 ms
   64 bytes from 104.22.40.171: seq=2 ttl=63 time=109.741 ms
   64 bytes from 104.22.40.171: seq=3 ttl=63 time=101.532 ms
   64 bytes from 104.22.40.171: seq=4 ttl=63 time=101.821 ms
   64 bytes from 104.22.40.171: seq=5 ttl=63 time=103.428 ms
   64 bytes from 104.22.40.171: seq=6 ttl=63 time=103.055 ms
   
   --- netology.ru ping statistics ---
   7 packets transmitted, 7 packets received, 0% packet loss
   round-trip min/avg/max = 101.532/105.206/111.044 ms
   PING netology.ru (104.22.40.171): 56 data bytes
   64 bytes from 104.22.40.171: seq=0 ttl=63 time=100.834 ms
   64 bytes from 104.22.40.171: seq=1 ttl=63 time=102.314 ms
   64 bytes from 104.22.40.171: seq=2 ttl=63 time=99.595 ms
   64 bytes from 104.22.40.171: seq=3 ttl=63 time=104.700 ms
   64 bytes from 104.22.40.171: seq=4 ttl=63 time=107.846 ms
   64 bytes from 104.22.40.171: seq=5 ttl=63 time=124.867 ms
   64 bytes from 104.22.40.171: seq=6 ttl=63 time=103.120 ms
   
   --- netology.ru ping statistics ---
   7 packets transmitted, 7 packets received, 0% packet loss
   round-trip min/avg/max = 99.595/106.182/124.867 ms
   ```
8. Определите по логам общее количество запусков команды `ping` и какое общее количество отправленых запросов
   ```sh
   docker logs pinger | grep -c PING
   docker logs pinger | grep -c seq
   ```
   ```
   2
   14
   ```
9.  Удалите контейнер с именем `pinger`
    ```sh
    docker rm pinger
    ```
    ```
    pinger
    ```
10. Удалите образ `busybox`
    ```sh
    docker rmi busybox
    ```
    ```
    Untagged: busybox:latest
    Untagged: busybox@sha256:650fd573e056b679a5110a70aabeb01e26b76e545ec4b9c70a9523f2dfaf18c6
    Deleted: sha256:46bd05c4a04f3d121198e054da02daed22d0f561764acb0f0594066d5972619b
    Deleted: sha256:3c4bc35c677d052e8ce865edea845689bf92fe12482683243d74f93fb690b893
    ```

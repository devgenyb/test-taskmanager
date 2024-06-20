##
бакенд
## бакенд Запуск

./backend/vendor/bin/sail up -d && \
./backend/vendor/bin/sail artisan migrate && \
./backend/vendor/bin/sail artisan db:seed

## тесты
./backend/vendor/bin/sail test

### Дополнительно ничего не делал


## фронтенд Запуск
./frontend yarn install && \
./frontend yarn run dev

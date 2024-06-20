## Тз

## Запуск

cd backend && \
composer install && \
./vendor/bin/sail up -d && \
./vendor/bin/sail artisan migrate:fresh && \
./vendor/bin/sail artisan db:seed && \
cd ..

## тесты
./vendor/bin/sail test

## Дополнительно ничего не делал


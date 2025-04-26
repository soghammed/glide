# Instructions

## Prerequisites
- PHP 8.3+, Nodejs v21.7.1+, Composer v2.2.25+ & MYSQL

## Setup
- git clone git@github.com:soghammed/glide.git (using ssh) or https://github.com/soghammed/glide.git (using https)
- cd glide && cp .env.example .env 
- Update mysql credentials in .env 
- composer install && php artisan migrate
- npm install
- composer run dev

## Front end
- Access via http://127.0.0.1:8000/

## Using console command to import data
- Import csv file by running: php artisan app:import-oui-vendor

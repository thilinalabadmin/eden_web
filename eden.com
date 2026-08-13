server {
    listen 80;
    listen [::]:80;

    server_name eden.com www.eden.com;

    root /var/www/eden.com/eden;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}


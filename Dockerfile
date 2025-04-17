FROM httpd:2.4

# Copy Apache configuration
COPY apache.conf /usr/local/apache2/conf/httpd.conf

# Copy website files
COPY htdocs/ /usr/local/apache2/htdocs/

EXPOSE 80

CMD ["httpd-foreground"]
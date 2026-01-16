# Guide d'Installation - Extension GD PHP

## 🚨 Problème : Extension GD non activée

L'extension GD (Graphics Draw) est requise pour le traitement des images dans votre portfolio. Sans cette extension, il est impossible de :
- Redimensionner les images uploadées
- Créer des thumbnails
- Compresser les images
- Traiter les formats d'images

## 🛠️ Solutions

### Option 1 : Activer GD dans php.ini (Recommandé)

#### Pour Windows (XAMPP/WAMP)
1. **Trouver votre php.ini** :
   - XAMPP : `C:\xampp\php\php.ini`
   - WAMP : `C:\wamp\bin\php\php{version}\php.ini`

2. **Éditer le fichier** et ajouter/décommenter :
   ```ini
   ; Décommenter cette ligne
   extension=gd
   
   ; Ou ajouter si elle n'existe pas
   ;extension=gd
   ```

3. **Redémarrer Apache** :
   - Via le panneau de contrôle XAMPP/WAMP
   - Ou redémarrer les services Apache et PHP

#### Pour Linux/Mac
1. **Trouver votre php.ini** :
   ```bash
   # Pour PHP-FPM
   php -i | grep "Loaded Configuration File"
   
   # Pour Apache/mod_php
   sudo find /etc -name "php.ini" 2>/dev/null
   ```

2. **Éditer le fichier** :
   ```ini
   extension=gd
   ```

3. **Redémarrer les services** :
   ```bash
   sudo systemctl restart apache2
   sudo systemctl restart php-fpm
   ```

### Option 2 : Installer le paquet GD (Linux)

#### Ubuntu/Debian
```bash
sudo apt-get update
sudo apt-get install php-gd php-gd-freetype php-gd-jpeg
```

#### CentOS/RHEL/Fedora
```bash
sudo yum install php-gd php-gd-freetype
```

#### macOS (Homebrew)
```bash
brew install php-gd
```

### Option 3 : Docker

#### Ajouter à votre Dockerfile
```dockerfile
FROM php:8.2-apache

# Installer GD et ses dépendances
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && docker-php-ext-install gd \
    --with-jpeg \
    --with-freetype \
    --with-png
```

#### Ou utiliser une image PHP avec GD
```dockerfile
FROM php:8.2-apache-gd
```

## ✅ Vérification

### Vérifier si GD est activée
Créez un fichier `test-gd.php` :
```php
<?php
if (extension_loaded('gd')) {
    echo "✅ Extension GD est activée\n";
    echo "Fonctions disponibles :\n";
    $functions = gd_info();
    echo "- GD Version: " . $functions['GD Version'] . "\n";
    echo "- Support JPEG: " . ($functions['JPEG Support'] ? 'Oui' : 'Non') . "\n";
    echo "- Support PNG: " . ($functions['PNG Support'] ? 'Oui' : 'Non') . "\n";
} else {
    echo "❌ Extension GD n'est PAS activée\n";
    echo "Veuillez suivre les instructions du guide d'installation\n";
}
?>
```

### Exécuter le test
```bash
php test-gd.php
```

## 🔧 Configuration Recommandée

### php.ini optimisé pour GD
```ini
; Extension GD
extension=gd

; Mémoire pour traitement des images
memory_limit = 256M

; Temps d'exécution
max_execution_time = 300

; Upload de fichiers
upload_max_filesize = 10M
post_max_size = 10M
```

## 🚀 Après l'installation

1. **Redémarrer votre serveur web**
2. **Vérifier l'activation** avec le script de test
3. **Tester l'upload d'images** dans l'admin du portfolio

## 📞 Si le problème persiste

### Alternative : Utiliser Imagick
Si GD ne peut pas être installée, vous pouvez utiliser Imagick :

```dockerfile
RUN apt-get install -y imagemagick libmagickwand-dev
RUN docker-php-ext-install imagick
```

### Vérifier les logs PHP
```bash
# Logs d'erreurs PHP
tail -f /var/log/apache2/error.log

# Ou logs spécifiques
php -i | grep error_log
```

## 🆘 Support

Si vous avez besoin d'aide supplémentaire :
1. Vérifiez la documentation PHP officielle
2. Consultez votre administrateur système
3. Vérifiez les spécifications de votre hébergement

---

**Note** : Une fois l'extension GD activée, redémarrez votre serveur et le traitement des images fonctionnera correctement dans votre portfolio.

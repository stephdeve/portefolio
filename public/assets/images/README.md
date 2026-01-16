# Images du portfolio

## Photo professionnelle

Pour ajouter votre photo professionnelle :

1. Placez votre fichier image dans ce dossier
2. Nommez-le `profile.jpg` ou `profile.png`
3. Recommandations :
   - Format carré (1:1)
   - Taille minimum 400x400px
   - Format JPG ou PNG
   - Fond neutre ou professionnel

## Exemple de chemin
```
/assets/images/profile.jpg
```

Le code HTML dans `home.php` fait référence à ce chemin :
```html
<img src="<?= htmlspecialchars($base, ENT_QUOTES, 'UTF-8') ?>/assets/images/profile.jpg" alt="Photo professionnelle" />
```

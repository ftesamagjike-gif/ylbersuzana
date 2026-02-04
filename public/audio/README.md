# Ky folder është për file-at audio të muzikës së dasmës

## Si ta përdorësh:

1. Vendos file-in audio këtu (p.sh. `shyhrete-behlulit.mp3`)
2. Referoje në kod si: `/audio/shyhrete-behlulit.mp3`

Shembull:
```
public/
  audio/
    shyhrete-behlulit.mp3   <-- Vendose këngën këtu
```

Pastaj në kod:
```tsx
<source src="/audio/shyhrete-behlulit.mp3" type="audio/mpeg" />
```

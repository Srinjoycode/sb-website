# Profile Image Placeholder

Place your profile photo here as `profile.jpg` (or `profile.png`).

## Recommended specifications

- **File name:** `profile.jpg`
- **Dimensions:** at least 400×400 pixels (square)
- **Format:** JPEG or PNG
- **File size:** under 500 KB for fast loading

## Quick resize tip

Using ImageMagick:
```bash
convert your-photo.jpg -resize 400x400^ -gravity center -extent 400x400 static/images/profile.jpg
```

## What happens without a profile image?

The hero section will display your initials ("SB") in a styled circular placeholder. Your site will still look great — the image is optional.

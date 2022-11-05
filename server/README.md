```shell
User(1)
    - Profile (1)
    - Settings (1)
    - Friend (N)
```

yarn add -D @types/jsonwebtoken @types/cookie-parser

### Storage

We are going to store profile and banners as static file, so basically we will be converting a `base64` string to a `jpg` image and save it withe the format `@<username>-<id>-profile.jpg`. Every update to the profile will then replace the image in the storage.

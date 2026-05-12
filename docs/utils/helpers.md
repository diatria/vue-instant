# Helpers

Fungsi-fungsi utilitas yang diekspor dari `vue-instant`.

```ts
import { beautyDate, message, numberFormat, /* ... */ } from 'vue-instant'
```

---

## Format Tanggal

### `beautyDate(date?, format?)`

Format tanggal ke tampilan yang mudah dibaca.

```ts
beautyDate('2024-01-15')                   // → '15 Jan 2024'
beautyDate('2024-01-15', 'DD/MM/YYYY')     // → '15/01/2024'
beautyDate()                               // → '' (string kosong jika tidak ada input)
```

### `beautyDateTime(date)`

Format tanggal dan waktu.

```ts
beautyDateTime('2024-01-15T09:30:00')  // → '15 Jan 2024 09:30'
```

### `minuteToTime(minute, leadingZero?)`

Konversi total menit ke format `HH:MM:00`.

```ts
minuteToTime(90)        // → '01:30:00'
minuteToTime(9, true)   // → '00:09:00'
minuteToTime(9)         // → '0:09:00'
```

---

## Format Angka

### `numberFormat(number, locale?, options?)`

Format angka sebagai mata uang.

```ts
numberFormat(50000)                                    // → 'Rp 50.000' (default IDR)
numberFormat(50000, 'en-US', { currency: 'USD' })      // → '$50,000.00'
```

---

## Teks & String

### `pascalCase(text)`

Konversi ke PascalCase.

```ts
pascalCase('hello world')   // → 'Hello World'
```

### `titleCase(text)`

Konversi ke Title Case.

```ts
titleCase('hello world')    // → 'Hello World'
```

### `urlToKebab(text)`

Konversi teks ke format path URL `/kebab-case`.

```ts
urlToKebab('Hello World')   // → '/hello-world'
```

### `url(text)`

Bersihkan double slash pada URL.

```ts
url('https://api.com//users//1')  // → 'https://api.com/users/1'
```

### `replaceString(text, data)`

Ganti `{key}` placeholder dalam template string.

```ts
replaceString('Halo, {name}! Anda memiliki {count} pesan.', {
  name: 'Dimas',
  count: 5,
})
// → 'Halo, Dimas! Anda memiliki 5 pesan.'
```

### `getInitials(name)`

Ambil inisial dari nama lengkap.

```ts
getInitials('Dimas Adi Satria')   // → 'DAS'
getInitials('John Doe')           // → 'JD'
```

### `htmlToPlainText(html)`

Hapus tag HTML menjadi teks biasa.

```ts
htmlToPlainText('<p>Hello <strong>World</strong></p>')   // → 'Hello World'
```

---

## URL & HTTP

### `resolveUrl(input)`

Gabungkan path relatif dengan `AppConfig.http.baseUrl`. URL absolut dikembalikan apa adanya.

```ts
// AppConfig.http.baseUrl = 'https://api.example.com'
resolveUrl('/users')                        // → 'https://api.example.com/users'
resolveUrl('https://other.com/endpoint')    // → 'https://other.com/endpoint'
```

### `hasHttpProtocol(url)`

Cek apakah URL memiliki protokol `http://` atau `https://`.

```ts
hasHttpProtocol('https://example.com')   // → true
hasHttpProtocol('/api/users')            // → false
```

### `httpHandleError(error?)`

Penanganan error Axios terpusat. Redirect ke `/403` jika response Forbidden.

```ts
try {
  await new HttpBuilder().get('/api/data')
} catch (error) {
  httpHandleError(error)
}
```

### `httpValidation(response)`

Kembalikan `true` untuk response 2xx.

```ts
const response = await axios.get('/api/data')
if (httpValidation(response)) {
  // berhasil
}
```

### `httpStatusCode(status)`

Peta nama status ke kode HTTP.

```ts
httpStatusCode('OK')          // → 200
httpStatusCode('FORBIDDEN')   // → 403
```

---

## Router

### `routeParam(key)`

Ambil parameter route Vue Router berdasarkan nama.

```ts
// URL: /users/42
routeParam('id')   // → '42'
```

---

## Browser

### `getBrowserType()`

Deteksi browser dari `navigator.userAgent`.

```ts
getBrowserType()   // → 'Chrome', 'Firefox', 'Safari', dll.
```

---

## Encoding

### `convertStringToHex(input)`

Encode string ke hex dengan prefix `csl:`.

```ts
convertStringToHex('hello')   // → '63736c3a...'
```

### `convertHexToString(input)`

Decode hex kembali ke string, menghapus prefix `csl:`.

```ts
convertHexToString('63736c3a...')   // → 'hello'
```

---

## UI

### `message(message, type)`

Tampilkan toast notifikasi Element Plus. Pesan duplikat digabungkan.

```ts
message('Data berhasil disimpan', 'success')
message('Terjadi kesalahan', 'error')
message('Perhatian!', 'warning')
message('Info tambahan', 'info')
```

---

## Lainnya

### `waiting(fn, delay?)`

Tunda eksekusi fungsi (default 500ms).

```ts
await waiting(() => console.log('delayed'), 1000)

// Dengan nilai kembalian
const result = await waiting(() => fetchData(), 500)
```

### `defaultType(type)`

Kembalikan nilai default untuk suatu nama tipe.

```ts
defaultType('text')     // → ''
defaultType('number')   // → 0
defaultType('boolean')  // → undefined
```

### `csl(data, label?)`

Wrapper `console.log` dengan label opsional.

```ts
csl({ id: 1, name: 'test' })
csl({ id: 1 }, 'User Data')
```

---

## Fungsi Deprecated

Fungsi-fungsi HTTP berikut sudah **deprecated**. Gunakan [`HttpBuilder`](./http.md) sebagai gantinya.

| Fungsi | Pengganti |
|---|---|
| `http()` | `new HttpBuilder().build()` |
| `httpGet(url, config?)` | `new HttpBuilder().get(url, config)` |
| `httpPost(url, data?, config?)` | `new HttpBuilder().post(url, data, config)` |
| `httpPut(url, data?, config?)` | `new HttpBuilder().put(url, data, config)` |
| `httpDelete(url, config?)` | `new HttpBuilder().delete(url, config)` |

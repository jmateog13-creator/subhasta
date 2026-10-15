# 🔨 La subhasta

Subhasta de valors per a tutoria: cada equip té 1000 monedes per comprar el que més valora (*Un amic de veritat*, *Ser famós a les xarxes*, *Salut perfecta*, *Un milió d'euros*…). El capità puja des del mòbil i l'equip decideix en veu baixa. Al final, la classe veu què ha pagat més car i en parla.


## Obrir

- **Profe (pantalla gran):** `index.html`. Tria el contingut i obre la sala.
- **Alumnes:** `movil.html`, o escanejant el QR, amb el codi de 4 números.
- **Previsualitzar sense sala:** `index.html?demo` i `movil.html?demo`.

## Com funciona la sala

- La pantalla gran mostra un **codi de 4 números** i un **QR**. Els alumnes hi entren des del mòbil, sense registrar-se ni iniciar sessió.
- Connexió en directe per Supabase Realtime (wss, port 443: passa el tallafoc de l'institut). Només s'envien missatges en directe: **no es desa res a cap base de dades**.
- Cada mòbil té un identificador aleatori. La pantalla del profe és l'única que compta vots i saldos, i valida tot el que arriba.
- `?demo` a la pantalla del profe simula alumnes per previsualitzar l'activitat sense sala.

## Flux de cada lot

1. **Presentant:** el valor en gran.
2. **Obrir la subhasta:** els capitans pugen amb tres imports (mínim, +50 i +100) o **Tot**. La primera puja té `segonsPrimera` segons; cada puja nova reinicia el compte a `segonsPuja`, amb «A la una… A les dues… I a les tres…».
3. **Adjudicat:** cop de martell (sintetitzat amb Web Audio) i segell amb el color de l'equip. Si ningú no puja, queda **desert**.

El profe pot **Adjudicar ara**, **Declarar desert** o **Acabar la subhasta** quan vulgui. Amb **Espai** s'avança. A la sala d'espera, **Alliberar** deixa lliure un equip si el capità s'ha equivocat de color.

## Final

- Què s'ha quedat cada equip i quantes monedes li sobren (que ja no valen res).
- Rànquing dels valors pel preu pagat, i quins han quedat deserts.
- Preguntes per debatre, a `valors.json › debat`.

## Privacitat

A la pantalla no surt cap nom: els equips són colors. L'identificador aleatori del capità només s'emet perquè cada mòbil sàpiga quin és el seu equip. No es desa res.

## Configurar

A `valors.json`: `monedes`, `pujaMinima`, `segonsPrimera`, `segonsPuja`, `equips` (color i forma: triangle, rombe, cercle, quadrat, estrella o hexàgon), `valors` i `debat`.

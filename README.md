# Donation System
## Własny system dotacji dla streamerów

Dzięki DonationSystem nie musisz już korzystać z pośredników, którzy pobierają ogromne prowizje od każdej wpłaty.
Od teraz możesz cały system donejtów oprzeć o własne serwery i mieć pełną kontrolę nad swoimi pieniędzmi.
Jedyne prowizję jakie będą cię obowiązywać to prowizje Przelewy24, które kształtują się na poziomie od 1.9% do 3.4%.

## Zalety:

- niezależny system płatności dostarczony przez Przelewy24.
- możliwości personalizacyjne donejtów
- panel administratora z konfiguratorem
- użycie najnowszych technologii
- prosty i czysty kod

## Wymagania:
- konto w seriwsie Przelewy24
- hosting internetowy z obsługą Node.js (praktycznie każdy serwis obsługuje)
- baza danych MySQL

## Instalacja:
```
1. Pobierz wszystkie pliki z githuba.
2. Pliki z folderu API wrzuć na stronę/podstronę z obsługą Node.js
3. Pliki z folderu Frontend wrzuć na swoją docelową stronę, na której twoi widzowie będą wysyłać donejty.
4. Skonfiguruj plik API/config/config.js - w nim ustawiasz swoje hasło do paneli, dane do konta w Przelewy24, dane do połączenia z bazą danych, adresy URL i porty.
5. Skonfiguruj plik Frontend/config/config.js - w nim ustawiasz adresy URL.
```

## Używanie:
```
1. Przejdź na adres <twój adres strony od frontendu>/admin
2. Zaloguj się do panelu hasłem, które wcześniej ustsawiłeś w pliku konfiguracyjnym API.
3. Wygeneruj link do wyświetlania donejtów i dodaj go do OBS.
4. Od teraz możesz już przyjmować wpłaty.
```


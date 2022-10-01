# Pollution Route

`{{BASE_URL}}/pollution`

## Table of Matters

- [Current Pollution by coordinates](#current-pollution)
- [Date where Paris zone is most polluted ](#paris-most-polluted)

---

## Current pollution

Get current pollution of the nearest city to GPS coordinates

```
GET {{BASE_URL}}/current/:latitude/:longitude
```

- In params

| Field     | Type   | Required |
| --------- | ------ | -------- |
| latitude  | double | yes      |
| longitude | double | yes      |

#### `HTTP STATUS 200`

```
{
    "Result":{
        "Pollution":{
            "ts": "2022-09-30T02:00:00.000Z" // DATE
            "aqius":35, // NUMBER
            "mainus":"co", // STRING
            "aqicn":15, // NUMBER
            "maincn":"p2" // STRING
        }
    }
}
```

| Field                   | Type   |
| ----------------------- | ------ |
| Result                  | Object |
| Result.Pollution        | Object |
| Result.Pollution.ts     | Date   |
| Result.Pollution.aqius  | Date   |
| Result.Pollution.mainus | String |
| Result.Pollution.aqicn  | Date   |
| Result.Pollution.maincn | String |

#### `HTTP STATUS 400/500`

| Field | Type   |
| ----- | ------ |
| error | String |

## Paris most polluted

Get date and time where the Paris zone is most polluted

```
GET {{BASE_URL}}/most-polluted/paris
```

#### `HTTP STATUS 204`

    empty response

#### `HTTP STATUS 200`

| Field    | Type |
| -------- | ---- |
| datetime | Date |

#### `HTTP STATUS 500`

| Field | Type   |
| ----- | ------ |
| error | String |

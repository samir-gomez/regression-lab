# Laboratorio – Pruebas de Regresión y Automatización en CI/CD (Grupo 7)

Repositorio con un pipeline de **GitHub Actions** que ejecuta la suite de regresión en cada Pull Request y
**bloquea el merge** si algo que antes funcionaba deja de funcionar.

- `src/pricing.js` – lógica de checkout (envío gratis desde $100.000, cupones).
- `tests/pricing.test.js` – suite de regresión (incluye el caso límite de $100.000).
- `.github/workflows/ci.yml` – pipeline (job `regression-tests`).
- `scripts/introduce-regression.sh` – introduce el error deliberado y abre el PR.

## Paso a paso

1. **Probar local:** `npm test` (Node 20+, sin dependencias) → todo en verde.
2. **Crear repo en GitHub y subir `main`:**
   `git init -b main && git add . && git commit -m "feat: checkout + CI" && gh repo create regression-lab --public --source=. --push`
3. **Quality Gate:** *Settings → Branches → Add rule* sobre `main`:
   - Require a pull request before merging
   - Require status checks to pass → seleccionar **regression-tests**
   (si no aparece, ejecuta el workflow una vez; en la UI nueva: *Settings → Rules → Rulesets*).
4. **Introducir la regresión:** `./scripts/introduce-regression.sh`
   (o a mano: en `calcularEnvio` cambiar `>=` por `>`, commit, push y abrir PR).
5. **Observar:** el check `regression-tests` queda en rojo (falla *envío gratis exactamente en el umbral*) y el botón
   **Merge** aparece bloqueado.
6. **Corregir:** revertir el cambio en la rama, push → el check pasa a verde y ya se puede hacer merge.

## Equivalente en GitLab CI (`.gitlab-ci.yml`)

```yaml
regression-tests:
  image: node:20
  script: [npm test]
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
```
(En *Settings → Merge requests* activar **Pipelines must succeed**.)

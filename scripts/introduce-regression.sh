#!/usr/bin/env bash
# Introduce una regresión deliberada y abre un Pull Request (requiere git y gh).
set -euo pipefail
git checkout main && git pull
git checkout -b feature/refactor-envio
# "Refactor inocente": >= se cambia por > y el envío gratis en $100.000 exactos se rompe
sed -i.bak 's/subtotal >= ENVIO_GRATIS_DESDE/subtotal > ENVIO_GRATIS_DESDE/' src/pricing.js && rm -f src/pricing.js.bak
git commit -am "refactor: simplificar condicion de envio gratis"
git push -u origin feature/refactor-envio
gh pr create --base main --title "Refactor del envio gratis" --body "Cambio 'inofensivo' (laboratorio de regresion)"

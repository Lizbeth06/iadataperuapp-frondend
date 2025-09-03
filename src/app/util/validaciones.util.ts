export type ValidationType = 'numero' | 'letra' | 'decimal' | 'decimalP';

export function validarInput(event: KeyboardEvent, type: ValidationType): void {
  const key = event.key;
  const code = key.charCodeAt(0);

  if (teclasEspeciales(event)) {
    return;
  }

  switch (type) {
    case 'numero':
      if (code < 48 || code > 57) {
        event.preventDefault();
      }
      break;

    case 'letra':
      if (!((code >= 65 && code <= 90) || (code >= 97 && code <= 122))) {
        event.preventDefault();
      }
      break;

    case 'decimal':
      validarDecimal(event);
      break;

    case 'decimalP':
        validarDecimalPositivo(event);
        break; 

    default:
      break;
  }
}

function teclasEspeciales(event: KeyboardEvent): boolean {
  const specialKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
  return specialKeys.includes(event.key) || (event.ctrlKey && ['c', 'v', 'a', 'x'].includes(event.key.toLowerCase()));
}

function validarDecimalPositivo(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const key = event.key;
  
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
  
    if (!allowedKeys.includes(key)) {
      event.preventDefault();
      return;
    }
  
    // Bloquear el "-" (negativo)
    if (key === '-') {
      event.preventDefault();
      return;
    }
  
    if (key === '.' && value.includes('.')) {
      event.preventDefault();
      return;
    }
  
    const parts = value.split('.');
    if (parts.length === 2) {
      const decimales = parts[1];
      if (input.selectionStart! > value.indexOf('.') && decimales.length >= 2) {
        event.preventDefault();
      }
    }
  }
  
  function validarDecimal(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const key = event.key;
  
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '-'];
  
    if (!allowedKeys.includes(key)) {
      event.preventDefault();
      return;
    }
  
    // Solo un punto decimal
    if (key === '.' && value.includes('.')) {
      event.preventDefault();
      return;
    }
  
    // Solo un signo negativo y debe estar al principio
    if (key === '-') {
      if (value.includes('-') || (input.selectionStart !== 0)) {
        event.preventDefault();
        return;
      }
    }
  
    const parts = value.replace('-', '').split('.');
    if (parts.length === 2) {
      const decimals = parts[1];
      if (input.selectionStart! > value.indexOf('.') && decimals.length >= 2) {
        event.preventDefault();
      }
    }
  
}
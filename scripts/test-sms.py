#!/usr/bin/env python3
import json
import os
import sys
import urllib.request
import urllib.error

# Carregar variáveis do ficheiro .env se existir
env_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
env_vars = {}
if os.path.exists(env_file):
    try:
        with open(env_file, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    env_vars[k.strip()] = v.strip().strip('"').strip("'")
    except Exception as e:
        print(f"[Aviso] Não foi possível ler .env: {e}")

api_key = env_vars.get("SMS_API_KEY") or os.environ.get("SMS_API_KEY", "")
api_secret = env_vars.get("SMS_API_SECRET") or os.environ.get("SMS_API_SECRET", "")
sender_id = env_vars.get("SMS_SENDER_ID") or os.environ.get("SMS_SENDER_ID", "CORRIDA16")

phone = sys.argv[1] if len(sys.argv) > 1 else "258821397762"
clean_phone = phone.replace("+", "").replace(" ", "").replace("-", "")
if len(clean_phone) == 9:
    clean_phone = "258" + clean_phone

print("=" * 70)
print(" TESTE MOZESMS SEGUNDO A DOCUMENTAÇÃO OFICIAL")
print("=" * 70)
print(f"Destinatário : {clean_phone}")
print(f"Sender ID    : {sender_id}")
print(f"X-API-Key    : {api_key[:6]}...{api_key[-4:] if len(api_key) > 10 else api_key}")
print(f"X-API-Secret : {api_secret[:6]}...{api_secret[-4:] if len(api_secret) > 10 else api_secret}")
print("=" * 70)

headers = {
    "X-API-Key": api_key,
    "X-API-Secret": api_secret,
    "Content-Type": "application/json",
}

def enviar_bulk(payload_data, descricao):
    print(f"\n📡 {descricao}")
    req = urllib.request.Request(
        "https://api.mozesms.com/sms/bulk",
        data=json.dumps(payload_data).encode("utf-8"),
        headers=headers,
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            print(f"✅ SUCESSO! HTTP STATUS: {resp.status}")
            body = resp.read().decode("utf-8")
            try:
                print(json.dumps(json.loads(body), indent=2))
            except:
                print(body)
            return True, None
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")
        print(f"❌ ERRO HTTP {e.code} ({e.reason})")
        try:
            parsed = json.loads(body)
            print(json.dumps(parsed, indent=2))
            msg = parsed.get("message") or parsed.get("error") or str(body)
        except:
            print(body[:500])
            msg = str(body)
        return False, (e.code, msg)
    except Exception as e:
        print(f"❌ FALHA DE CONEXÃO: {e}")
        return False, (0, str(e))

# Teste 1: com o sender_id configurado no .env
ok, err = enviar_bulk(
    {
        "sender_id": sender_id,
        "messages": [{"phone": clean_phone, "message": f"Teste 16a Corrida Millennium bim ({sender_id})"}]
    },
    f"Teste 1: POST /sms/bulk com sender_id='{sender_id}'"
)

# Teste 2: se o sender_id falhar por não aprovação (403), testar com 'MozeSMS'
if not ok and err and err[0] == 403:
    print("\n⚠️ O Sender ID atual não está aprovado na sua conta MozeSMS.")
    print("👉 Testando com o remetente padrão da plataforma ('MozeSMS')...")
    enviar_bulk(
        {
            "sender_id": "MozeSMS",
            "messages": [{"phone": clean_phone, "message": "Teste 16a Corrida Millennium bim (MozeSMS)"}]
        },
        "Teste 2: POST /sms/bulk com sender_id='MozeSMS'"
    )

    print("\n👉 Testando sem definir sender_id (deixando a API usar o remetente padrão da conta)...")
    enviar_bulk(
        {
            "messages": [{"phone": clean_phone, "message": "Teste 16a Corrida Millennium bim (Padrão)"}]
        },
        "Teste 3: POST /sms/bulk sem sender_id"
    )

print("\n" + "=" * 70)

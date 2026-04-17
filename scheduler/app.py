import os
from datetime import datetime, timezone

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.get("/")
def health_check():
    return jsonify({
        "ok": True,
        "service": "zentransact-scheduler-api",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }), 200


@app.get("/api/status")
def api_status():
    return jsonify({
        "status": "running",
        "environment": os.getenv("FLASK_ENV", "production"),
        "rpc_url_configured": bool(os.getenv("RPC_URL")),
        "contract_address": os.getenv("CONTRACT_ADDRESS", ""),
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }), 200


if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "10000"))
    app.run(host=host, port=port)

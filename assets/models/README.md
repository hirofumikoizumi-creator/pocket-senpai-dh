# Qwen3 GGUF model

Place the bundled on-device model here before a production build.

Expected filename:

```text
qwen3-0.6b-q4_k_m.gguf
```

Recommended model class:

- Qwen3 0.6B Instruct GGUF
- Quantization: Q4_K_M or another small iOS-friendly quantization

The app never calls a cloud LLM. If this model file is absent, smaller than 50 MB, or fails to load, the consultation flow falls back to supervised templates.

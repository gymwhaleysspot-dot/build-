# MT12 EdgeTX Lua Compiler

This repository builds stripped Lua 5.3 bytecode for the RadioMaster MT12 running EdgeTX, then converts the desktop Lua chunk from `4/8/4/8/8` fields to the MT12-compatible `4/4/4/4/4` format.

## GitHub build

1. Put one or more `.lua` files under `src/`.
2. Commit or upload them to GitHub.
3. Open **Actions → Build MT12 EdgeTX LUAC**.
4. Run the workflow, or let it run automatically after a change under `src/`.
5. Download the `mt12-edgetx-luac` artifact.
6. Deploy only the final `.luac` file from the artifact.

The workflow compiles every Lua source under `src/`, preserves subfolders in `dist/`, creates SHA-256 hashes, and rejects normalized output larger than 87,000 bytes.

## Local build

Requirements: Lua 5.3, Node.js, Bash.

```bash
chmod +x compile_mt12.sh
./compile_mt12.sh src/example.lua dist/example.luac
```

To change the byte limit for one build:

```bash
MAX_BYTES=96000 ./compile_mt12.sh src/example.lua dist/example.luac
```

Manual equivalent:

```bash
luac5.3 -s -o script_raw.luac script.lua
node normalize_luac53_mt12.js script_raw.luac script.luac
```

Never deploy `script_raw.luac`. The raw desktop chunk is not MT12-compatible.

## Files

- `compile_mt12.sh` — compiler, normalization, header validation, size gate, and SHA-256 reporting.
- `normalize_luac53_mt12.js` — recursively converts Lua 5.3 prototypes, strings, integers, and floating-point constants to MT12 field sizes.
- `.github/workflows/build-mt12-luac.yml` — automatic GitHub Actions build and artifact upload.
- `src/` — place Lua source files here.

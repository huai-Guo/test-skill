# test-skill

一个专门用于评估 **Skill 是否真的带来增量能力** 的实验仓库。

核心问题不是“Agent 能不能完成任务”，而是：

> 在模型、Harness、工具、预算和任务完全相同的条件下，开启 Skill 相比不开 Skill，究竟提升了多少？

## 仓库结构

```text
test-skill/
├─ easy-case/              # 低成本、可人工检查的小型 Skill 实验
├─ swe-bench-pro/          # 真实长周期软件工程评测（SWE-bench Pro V2）
│  ├─ upstream/            # 官方 benchmark，作为 git submodule 固定版本
│  └─ experiment.example.yaml
├─ docs/
│  └─ EVALUATION_PROTOCOL.md
└─ results/
   └─ README.md
```

### easy-case

原仓库中的网页、Spec Kit 配置、Skills、specs 和验收材料已整体迁入这里。它适合：

- 快速验证 Skill 是否触发；
- 观察 Skill 对过程和产物的影响；
- 人工检查 Design / Review / Develop 等能力；
- 在跑昂贵 benchmark 前先做 smoke test。

进入目录后按原方式运行即可：

```powershell
cd easy-case
python -m http.server 4173
```

### swe-bench-pro

用于更真实的软件工程能力评测。当前固定到 **SWE-bench Pro V2** 官方版本（2026-09-22），默认公开集为 642 个经过验证的任务，并包含 HARD-51 子集。

这里不复制一份静态 benchmark，而是把官方仓库作为 submodule 固定到明确 commit，保证：

1. 可复现；
2. 不污染本仓库历史；
3. 后续可以明确升级 benchmark 版本；
4. Skill ON / OFF 永远面对同一份任务和 verifier。

首次 clone：

```bash
git clone --recurse-submodules https://github.com/huai-Guo/test-skill.git
```

已有 clone：

```bash
git submodule update --init --recursive
```

## 推荐评测方式

对每个任务做配对实验：

```text
same task
   ├─ baseline: Skill OFF × N trials
   └─ treatment: Skill ON  × N trials
```

固定模型、Harness、系统提示词（除 Skill 注入）、工具、token/turn/time budget、网络策略和 grader，只改变 Skill。

主结果报告：

- task success / resolved rate；
- paired delta（Skill - No Skill）；
- 多次 trial 的稳定性；
- token、tool calls、wall time、成本；
- Skill trigger precision / recall；
- 必要时增加人工或 LLM rubric。

完整规范见 [docs/EVALUATION_PROTOCOL.md](docs/EVALUATION_PROTOCOL.md)。

## 建议执行顺序

1. **easy-case**：先确认 Skill 能正确触发且方向有效；
2. **SWE-bench Pro HARD-51**：做高信号、小规模正式实验；
3. **SWE-bench Pro V2 full**：确认结果后再跑完整 642 tasks；
4. 把结果按统一格式写入 `results/`，长期比较 Skill v1 / v2 / v3。


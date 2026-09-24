# SWE-bench Pro Skill Eval

这里用于在真实长周期软件工程任务上测试 Skill 的增量效果。

## Benchmark

本目录通过 `upstream/` submodule 固定官方：

- repository: `scaleapi/SWE-bench_Pro-os`
- release line: SWE-bench Pro V2
- pinned commit: `66f92766bba642462d4bbe5479e83f91f9211862`
- public V2: 642 validated tasks / 11 repositories
- high-signal subset: HARD-51

官方 V2 使用 Harbor task 结构，每个任务包含 instruction、verifier、reference solution 和公开 container image。

## 为什么用 submodule

不要把 642 个 benchmark task 复制进本仓库。submodule 可以把“评测框架”和“被评测 Skill 实验”分开，同时固定 benchmark commit，避免今天跑的任务和下个月跑的任务已经不是同一版本。

## 初始化

```bash
git submodule update --init --recursive
cd swe-bench-pro/upstream
```

按照官方 V2 README 安装 Harbor / Modal。

## 第一阶段：sanity check

在正式 Skill A/B 前先验证 benchmark 环境：

```bash
harbor run -p v2/tasks -e modal -n 50 -a oracle --job-name sbp-v2-oracle
harbor run -p v2/tasks -e modal -n 50 -a nop    --job-name sbp-v2-nop
```

预期：oracle 全通过，nop 全失败。

## 第二阶段：Skill A/B

推荐首先跑 HARD-51，而不是直接烧完整 642 tasks。

每个 task：

```text
same model + same harness + same budget
├─ no-skill × 3
└─ skill    × 3
```

特别注意：

- Skill OFF 不是换一个 prompt 风格，而是只移除待测 Skill；
- 不允许一组联网而另一组离线；
- 不允许改变 tool set、turn limit、reasoning effort；
- 最终成绩用官方 fresh-sandbox patch replay re-grade；
- 保存 patch + trace + tokens + tool calls + latency。

## 第三阶段：Full V2

只有当 HARD-51 上观察到稳定 signal 后，再扩展到完整 642 tasks。

这样可以避免在 Skill 没有明显效果时过早消耗大量模型调用与 sandbox 成本。

## 配置

从 [experiment.example.yaml](experiment.example.yaml) 复制一份实验配置，记录每次实验的模型、Harness、Skill 版本、benchmark commit 和预算。


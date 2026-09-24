# Skill Evaluation Protocol

这份协议用于回答一个问题：**Skill 本身带来了多少可归因的能力增量？**

## 1. 实验设计：paired ablation

每个 task 同时跑 Control 与 Treatment：

- Control：Skill OFF
- Treatment：Skill ON

除 Skill 外，其余变量必须固定：

- model 与具体版本；
- reasoning / temperature 等推理参数；
- Agent Harness 与版本；
- system prompt；
- tools 与权限；
- 网络访问策略；
- token / turn / wall-time budget；
- repository / task snapshot；
- grader / verifier；
- 环境镜像。

推荐每个条件至少运行 3 次；高方差任务可以运行 5 次或更多。

## 2. 为什么必须配对

不要只比较两个独立总体分数。优先记录每个 task 的：

```text
delta_i = score(skill_on, task_i) - score(skill_off, task_i)
```

这样可以直接观察：

- Skill 帮到了哪些任务；
- 哪些任务没有变化；
- 哪些任务出现退化；
- 增益是否集中在少数 case。

## 3. 指标

### 3.1 Outcome

优先使用确定性 grader：

- tests pass；
- hidden tests；
- build / lint / typecheck；
- SWE-bench resolved；
- golden defect recall。

### 3.2 Quality

无法完全确定性判断的任务使用结构化 rubric 或 blind pairwise judge：

- requirement coverage；
- correctness；
- maintainability；
- architecture quality；
- explanation quality；
- fixability。

Design 类任务优先 A/B/Tie pairwise，而不是让 judge 随意打一个总分。

### 3.3 Reliability

记录：

- pass@1；
- N-trial success rate；
- variance；
- catastrophic regression 数量。

### 3.4 Skill Triggering

Skill 评测必须同时包含：

- positive tasks：应该触发；
- negative tasks：不应该触发；
- near-negative tasks：相似但应该由其他 Skill 处理。

报告：

- trigger precision；
- trigger recall；
- false activation rate。

### 3.5 Efficiency

至少记录：

- input/output tokens；
- tool calls；
- turns；
- wall time；
- estimated cost；
- retry count。

能力提升必须和额外成本一起解释。

## 4. 三类领域 Skill 的推荐 grader

### Develop

优先级：

1. hidden tests / regression tests；
2. build / lint / typecheck；
3. requirement coverage；
4. code quality rubric；
5. token / time cost。

### Review

预置并冻结 known defects，报告：

- defect recall；
- precision；
- critical/high severity recall；
- false-positive rate；
- localization accuracy；
- root-cause accuracy；
- proposed-fix validity。

### Design

不存在唯一标准答案时：

- 冻结 requirement checklist；
- 使用 blind pairwise A/B/Tie；
- 分维度比较 scalability、availability、consistency、failure handling、operability、cost awareness；
- 定期抽样做人工校准。

## 5. SWE-bench Pro 专用规则

本仓库使用 SWE-bench Pro V2 的 locked protocol 作为正式 Develop 类 benchmark。

原则：

1. Agent phase 保持官方离线策略；
2. Skill ON/OFF 使用完全相同的 task image；
3. 两组使用完全相同的时间与 turn budget；
4. 只改变 Skill 注入；
5. 最终分数以 fresh-sandbox patch replay / re-grade 为准；
6. 保存每次 trial 的 patch、trace 和资源统计；
7. 先 HARD-51，再决定是否扩展到 full 642。

## 6. 最小结果表

| task_id | condition | trial | success | score | tokens | tool_calls | wall_time_s | notes |
|---|---|---:|---:|---:|---:|---:|---:|---|
| ... | no-skill | 1 | 0/1 | ... | ... | ... | ... | ... |
| ... | skill | 1 | 0/1 | ... | ... | ... | ... | ... |

最终至少给出：

```text
No Skill success rate
Skill success rate
Paired delta
95% CI / bootstrap CI（样本足够时）
Cost delta
Latency delta
Regression count
```

## 7. 解释结果时避免的错误

- 只跑一次就下结论；
- Skill ON 与 OFF 使用不同模型版本；
- 一组允许联网、另一组不允许；
- judge 知道哪个答案使用了 Skill；
- 只挑 Skill 擅长的正样本，不放 negative control；
- benchmark 更新后把新旧结果直接比较；
- 只报告平均分，不看 task-level regression；
- Skill 提升 2pp，但 token / latency 翻倍却不报告。


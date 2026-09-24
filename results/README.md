# Results

所有正式实验结果放在这里。建议一个实验一个目录：

```text
results/
└─ 2026-09-xx-<skill>-<benchmark>/
   ├─ experiment.yaml
   ├─ task-results.csv
   ├─ summary.md
   ├─ baseline/
   └─ treatment/
```

至少保留 task-level 数据，不要只保留最终平均分。

推荐字段：

```text
task_id, condition, trial, success, score,
tokens_in, tokens_out, tool_calls, turns,
wall_time_s, estimated_cost, patch_path, trace_path
```

只有 benchmark commit、模型版本、Harness、预算和 grader 都被记录下来，不同批次结果才具备可比性。

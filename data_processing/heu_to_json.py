import pandas as pd
import pm4py
import numpy as np
from google.colab import files
import json
from collections import OrderedDict

#로그 기록이 담긴 csv를 Heuristic Model로 변환
df_example_log = pd.read_csv('example_log.csv')

event_log_pm4py = pm4py.format_dataframe(df_example_log, case_id='case_id', activity_key='activity',
                                         timestamp_key='timestamp', timest_format='%Y-%m-%d %H:%M:%S%z')
heu_model = pm4py.discover_heuristics_net(event_log_pm4py)

#Heurisic Model을 3d 그래프 input에 적합한 json으로 변환
file_data = OrderedDict()

#Nodes
nodes = []

nodes.append({"id":"start", "nodelabel": "start", "value": 1})

for a,b in heu_model.activities_occurrences.items():
  nodes.append({"id": a, "nodelabel":a , "value": int(b)})

nodes.append({"id":"end", "nodelabel": "end", "value": 1})
file_data["nodes"] = nodes

#Links
links = []

for f in heu_model.start_activities:
  for g, h in f.items():
    links.append({"source":"start", "target": g, "weight": 1})

for a in heu_model.performance_matrix.keys():
  for b in heu_model.performance_matrix[a].keys():
    links.append({"source":a, "target": b, "weight": heu_model.performance_matrix[a][b]})

for c in heu_model.end_activities:
  for d, e in c.items():
    links.append({"source":d, "target": "end", "weight": 1})

file_data["links"]=links

#json으로 출력
print(json.dumps(file_data, ensure_ascii=False, indent="\t"))

with open('test1.json', 'w', encoding="utf-8") as make_file:
  json.dump(file_data, make_file, ensure_ascii=False, indent="\t")

files.download('test1.json')
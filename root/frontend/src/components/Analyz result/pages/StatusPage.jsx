import React from "react";
import QualityGate from "../component/QualityGate ";

const StatusPage = () => {
  const metricsData = {
    "_id": {
      "$oid": "66d197d8d0477a8bdb0ae167"
    },
    "hash": "4d6c8d0f312876782cf135ce31acb71be57d344ef7183549401451375c72178f",
    "directory_path": "D:\\Projects\\Tutorials\\spring-boot-3-api\\src\\main\\java\\com\\dasunwickr\\spring_boot_3_api",
    "analysis_start_time": 1725011920.121682,
    "results": {
      "D:\\Projects\\Tutorials\\spring-boot-3-api\\src\\main\\java\\com\\dasunwickr\\spring_boot_3_api\\Application.java": {
        "cyclomatic_complexity": 2,
        "loc": 20,
        "comment_ratio": 0,
        "halstead_bugprop": 0.072,
        "halstead_difficulty": 8.45,
        "halstead_effort": 1834.757,
        "halstead_timerequired": 101.931,
        "halstead_volume": 217.131
      },
      "D:\\Projects\\Tutorials\\spring-boot-3-api\\src\\main\\java\\com\\dasunwickr\\spring_boot_3_api\\run\\JdbcRunRepository.java": {
        "cyclomatic_complexity": 0,
        "loc": 54,
        "comment_ratio": 0,
        "halstead_bugprop": 0.829,
        "halstead_difficulty": 39.111,
        "halstead_effort": 97273.11,
        "halstead_timerequired": 5404.062,
        "halstead_volume": 2487.097
      },
      "D:\\Projects\\Tutorials\\spring-boot-3-api\\src\\main\\java\\com\\dasunwickr\\spring_boot_3_api\\run\\Location.java": {
        "cyclomatic_complexity": 2,
        "loc": 4,
        "comment_ratio": 0,
        "halstead_bugprop": 0.007,
        "halstead_difficulty": 2,
        "halstead_effort": 39.303,
        "halstead_timerequired": 2.183,
        "halstead_volume": 19.651
      },
      "D:\\Projects\\Tutorials\\spring-boot-3-api\\src\\main\\java\\com\\dasunwickr\\spring_boot_3_api\\run\\Run.java": {
        "cyclomatic_complexity": 1,
        "loc": 28,
        "comment_ratio": 0,
        "halstead_bugprop": 0.149,
        "halstead_difficulty": 10.333,
        "halstead_effort": 4611.225,
        "halstead_timerequired": 256.179,
        "halstead_volume": 446.248
      },
      "D:\\Projects\\Tutorials\\spring-boot-3-api\\src\\main\\java\\com\\dasunwickr\\spring_boot_3_api\\run\\RunController.java": {
        "cyclomatic_complexity": 0,
        "loc": 45,
        "comment_ratio": 0,
        "halstead_bugprop": 0.397,
        "halstead_difficulty": 36.5,
        "halstead_effort": 43453.533,
        "halstead_timerequired": 2414.085,
        "halstead_volume": 1190.508
      }
      // Add more files as necessary
    }
  };

  return (
    <div>
      <QualityGate data={metricsData.results} />
    </div>
  );
};

export default StatusPage;

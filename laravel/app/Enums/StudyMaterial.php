<?php

namespace App\Enums;

enum StudyMaterial: string
{
    case Programming = 'Programming';
    case QA = 'Quality Assurance';
    case DataScience = 'Data Science';
    case AI = 'Artificial Intelligence';
    case ML = 'Machine Learning';
    case WebDevelopment = 'Web Development';
    case MobileDevelopment = 'Mobile Development';
    case DevOps = 'DevOps';
    case CyberSecurity = 'Cybersecurity';
    case CloudComputing = 'Cloud Computing';
    case UIUX = 'UI/UX Design';
    case Database = 'Database';
    case Blockchain = 'Blockchain';
    case GameDevelopment = 'Game Development';
    case DataStructures = 'Data Structures';
    case Algorithms = 'Algorithms';

    public function label(): string
    {
        return $this->value;
    }
}

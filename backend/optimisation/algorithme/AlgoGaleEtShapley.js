const AlgoInterface = require("./AlgoInterface");

// Pseudo code de wikipédia :
/*
Entrée : Deux ensembles finis M (d’hommes) et W (de femmes) de cardinal n ;
         Une famille L de relations de préférences ;
Sortie : Un ensemble S de couples engagés (homme ; femme) ;
fonction mariageStable {
    Initialiser tous les m ∈ M et w ∈ W à célibataire
    tant que ∃ homme célibataire m qui peut se proposer à une femme w {
       w = femme préférée de m parmi celles à qui il ne s'est pas déjà proposé
       si w est célibataire
         (m, w) forment un couple
       sinon un couple (m', w) existe
         si w préfère m à m'
           (m, w) forment un couple
            m' devient célibataire
         sinon
           (m', w) restent en couple
    }
    Retourner l’ensemble S des couples engagés
}
 */
class AlgoGaleEtShapley extends AlgoInterface{
    optimizeAssignments(needs, employees) {
        return { totalScore, assignments };
    }
}

module.exports = AlgoGaleEtShapley;

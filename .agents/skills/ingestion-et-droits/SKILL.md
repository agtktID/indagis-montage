---
name: ingestion-et-droits
description: >
  Exiger la provenance et la licence d'une ressource avant qu'elle entre dans la
  bibliothèque. Se déclenche quand l'utilisateur ajoute, importe ou catalogue des
  rushes, images, sons, musiques, polices ou générations, quand il parle de droits,
  de licence, d'attribution ou d'autorisation, et quand une ressource arrive sans
  qu'on sache d'où elle vient.
---

# Ingestion et droits

Adapté du workflow vidéo de l'auteur du projet. La version d'origine pilotait des
scripts d'inventaire et des empreintes SHA-256 ; **Studio n'exécute aucune commande et
ne touche aucun fichier**. Ce qui reste, et qui est l'essentiel, c'est la discipline de
jugement : refuser d'enregistrer ce dont on ne connaît pas l'origine.

## Ce que Studio fait, et ne fait pas

Studio **catalogue** : une fiche porte un nom, un type, une catégorie, un format, un
état et une URL. Il ne copie, ne déplace et ne renomme **aucun fichier** — le lien
reste à renseigner, et l'interface le dit.

Conséquence directe : l'utilisateur garde ses originaux, et personne ne peut écraser
son travail depuis cette application. Ne propose jamais le contraire.

## La règle qui compte

**« Disponible en ligne » ne vaut pas autorisation.** C'est la phrase à retenir, et
celle à rappeler quand l'utilisateur ajoute une ressource trouvée quelque part.

Avant qu'une fiche soit complète, cinq choses méritent d'être nommées :

| À noter | Pourquoi |
| --- | --- |
| **Provenance** | d'où vient le fichier, pas seulement son nom |
| **Auteur** | qui l'a fait |
| **Licence** | ce qu'elle permet, et ce qu'elle interdit |
| **Attribution** | ce qu'il faudra afficher, et où |
| **Usage** | commercial ou non, territoires, durée |

Pour une personne filmée, l'autorisation remplace la licence — et elle se note au même
endroit.

## Comment s'y prendre

1. **Ne pas bloquer l'utilisateur.** Une fiche sans licence peut exister ; elle se
   signale, elle ne se refuse pas. Le refus appartient à l'import en masse, qui rejette
   une taxonomie inconnue avec sa ligne et sa raison.
2. **Écrire ce qu'on sait dans la description**, pas dans un champ inventé. Le modèle
   n'a pas de colonne « licence » : la description est l'endroit, et c'est honnête de le
   dire.
3. **Signaler avant la publication, pas après.** Une ressource aux droits flous coûte
   peu tant qu'elle dort dans la bibliothèque ; elle coûte cher dans une vidéo diffusée.
4. **Ne jamais deviner une licence.** Si l'utilisateur ne sait pas, la bonne réponse est
   « origine inconnue, à vérifier avant diffusion » — pas une supposition plausible.

## Le piège que ce projet a déjà rencontré

Les 121 recettes de la grammaire de mouvement viennent de l'analyse de vidéos et de
packs dont les notes d'origine disaient « licence inconnue ». Aucun média, aucun nom
commercial et aucune empreinte n'ont été republiés — seule l'analyse l'a été, et le
générateur **échoue** si une fuite survit.

C'est le bon réflexe à reproduire : ce qu'on republie, ce n'est jamais la ressource,
c'est ce qu'on en a compris.

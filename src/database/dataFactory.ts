import {Connection} from "./connection";

export class DataFactory {
    private static _instance: DataFactory;
    private _connection: Connection;

    public static getInstance(): DataFactory {
        if (DataFactory._instance === null || DataFactory._instance === undefined) {
            DataFactory._instance = new DataFactory();
        }

        return DataFactory._instance;
    }

    public async createData()
    {
        await this.createQuestions();
        await this.createAnswers();
    }

    private async createQuestions() {
        return this._connection.sequelize.transaction(t1 => {
            return Promise.all([
                this._connection.question.create({
                    id: 1,
                    textGer: 'In welchem Sternzeichen war Maximilian I. geboren?',
                    textEng: 'What was Maximilian’s zodiac sign?',
                    order: 1,
                    content: "assets/img/WK_13.jpg",
                    elaborationGer: 'Maximilian wurde am 22. März 1459 geboren. Es wird außerdem von einem Kometen berichtet, der zu Maximilians Geburt am Himmel sichtbar gewesen sein soll. Kometen wurden im Spätmittelalter und der Frühen Neuzeit als Vorzeichen betrachtet.',
                    elaborationEng: 'Maximilian was born on 22nd March 1459. A comet allegedly appeared during the time of his birth. Comets were viewed as signs of prophecy during the Late Middle Ages and the Early Modern Period.'
                }),
                this._connection.question.create({
                    id: 2,
                    textGer: 'Wie hießen Maximilians Eltern?',
                    textEng: 'Who were Maximilian’s parents?',
                    order: 2,
                    content: "assets/img/WK_8.jpg",
                    elaborationGer: 'Die Eltern Maximilians waren Kaiser Friedrich III. aus dem Hause Habsburg und Eleonore von Portugal. Bei der Kaiserkrönung in Rom im März 1452 segnete Papst Nikolaus V. die Ehe des Paares.',
                    elaborationEng: 'Maximilian’s parents were Emperor Frederick III of Habsburg and Eleonor of Portugal. The pope blessed their marriage when Frederick was crowned emperor in 1452.'
                }),
                this._connection.question.create({
                    id: 3,
                    textGer: 'Welche Kopfbedeckung ist hier rot eingefärbt?',
                    textEng: 'Which headgear is coloured red?',
                    order: 3,
                    content: "assets/img/WK_10.jpg",
                    elaborationGer: 'Der Kardinalshut ist ein Hut mit einer ungewöhnlich breiten Krempe und Quasten. Er wurde nur selten getragen und später auf den Sarg des jeweiligen Kardinals gelegt. Außerdem ist er oft als Wappenzier zu sehen.',
                    elaborationEng: 'The galero is a hat with an unusually broad brim and tassels. It was scarely worn and mainly used to adorn the cardinal’s grave after his death. It was commonly used as a adornment of the cardinal’s coat of arms.'
                }),
                this._connection.question.create({
                    id: 4,
                    textGer: 'Welches Ritual wird hier dargestellt?',
                    textEng: 'Which ritual can be seen here?',
                    order: 4,
                    content: "assets/img/WK_21.jpg",
                    elaborationGer: 'Maximilian wurde in Wiener Neustadt getauft. Sein Taufpate war der Woiwode Nikolaus Ujlaki. Sein Namenspatron ist Maximilian von Lorch.',
                    elaborationEng: 'Maximilian was baptised in Wiener Neustadt. His godfather was the Vojvoda Nikolaus Ujlaki, his namesake was Maximilian of Lorch. '
                }),
                this._connection.question.create({
                    id: 5,
                    textGer: 'Maximilian trägt einen Ehrenkranz. Wie oft ist er auf dem Bild zu sehen?',
                    textEng: 'Maximilian is adorned with a laurel wreath. How many times can he be seen on the picture?',
                    order: 5,
                    content: "assets/img/WK_15.jpg",
                    elaborationGer: 'Maximilian übt sich hier spielerisch in verschiedenen ritterlichen wie etwa der Jagd oder dem Turnier.',
                    elaborationEng: 'Here we can see Maximilian playfully learning different knightly skills like hunting or jousting.'
                }),
                this._connection.question.create({
                    id: 6,
                    textGer: 'Welches Schreibwerkzeug benutzt Maximilian hier?',
                    textEng: 'Which writing tool is Maximilian using?',
                    order: 6,
                    content: "assets/img/WK_18.jpg",
                    elaborationGer: 'Bis ins 19. Jahrhundert wurde mit Federkielen geschrieben, die hauptsächlich von Gänsen stammten. Die Federkiele wurden an der Spitze zugeschnitten und gespalten, um die Tinte aufnehmen zu können.',
                    elaborationEng: 'Up until the 19th century the most common writing tool was the quill, usually made of goose feathers. '
                }),
                this._connection.question.create({
                    id: 7,
                    textGer: 'Was ist hier auf den Schriftstücken rot markiert?',
                    textEng: 'Which features of these documents are coloured red?',
                    order: 7,
                    content: "assets/img/WK_22.jpg",
                    elaborationGer: 'Siegel wurden zur Beglaubigung und zum Verschließen von Schriftstücken verwendet. Neben dem klassischen Wachssiegel gab es auch Oblatensiegel. Metallsiegel hingegen waren Kaiser und Papst vorbehalten.',
                    elaborationEng: 'Seals were used both for sealing documents as well as for their authentication. They were commonly made out of wax or paper; metal seals were only used by emperors and popes.'
                }),
                this._connection.question.create({
                    id: 8,
                    textGer: 'Wo ist Maximilian hier zu Gast?',
                    textEng: 'Where is Maximilian?',
                    order: 8,
                    content: "assets/img/WK_32.jpg",
                    elaborationGer: 'Maximilian besucht hier eine Münzwerkstatt. Zu sehen ist der Herstellungsprozess von Münzen: dazu gehören beispielsweise das Prägen und das Abwiegen.',
                    elaborationEng: 'Maximilian is visiting a mint. The depiction shows the production of coins: minting and weighing of the coins were parts of this process.'
                }),
                this._connection.question.create({
                    id: 9,
                    textGer: 'Welchem Hobby ging Maximilian sehr gerne nach?',
                    textEng: 'What was Maximilian’s favourite hobby?',
                    order: 9,
                    content: "assets/img/WK_35.jpg",
                    elaborationGer: 'Für Adelige war die Teilnahme an der Jagd eine gesellschaftliche Konvention. Maximilian ließ sogar prächtige Handschriften zu diesem Thema anfertigen.',
                    elaborationEng: 'For nobility hunting was part of the social conventions. Maximilian even commissioned richly illuminated manuscripts depicting hunting scenes.'
                }),
                this._connection.question.create({
                    id: 10,
                    textGer: 'Welcher Helm ist hier rot eingefärbt?',
                    textEng: 'Which type of helmet is coloured red on this picture?',
                    order: 10,
                    content: "assets/img/WK_42.jpg",
                    elaborationGer: 'Zu unterschiedlichen Zeiten waren verschiedene Helmformen in Gebrauch. Genau wie der Brustharnisch waren sie Teil der Rüstung. In Museen sind heute noch viele Rüstungen zu sehen.',
                    elaborationEng: 'Through the time different types of helmets were at use. Like the breastplate, a helmet was part of the armour. There are numerous museum collections, which display armours.'
                }),
                this._connection.question.create({
                    id: 11,
                    textGer: 'Wie hieß Maximilians erste Ehefrau?',
                    textEng: 'Who was Maximilian’s first wife?',
                    order: 11,
                    content: "assets/img/WK_53.jpg",
                    elaborationGer: 'Am 19. August 1477 heirateten Maximilian und Maria von Burgund. Das Leben am burgundischen Hof prägte Maximilian sehr stark. Maria von Burgund starb bereits 1482 bei einem Jagdunfall.',
                    elaborationEng: 'Maximilian married Mary of Burgundy on 19th August 1477. Life on the court of Burgundy had great influence on Maximilian. In 1482, Mary had a hunting accident and died.'
                }),
                this._connection.question.create({
                    id: 12,
                    textGer: 'Wie kommunizierten die Fürsten im Mittelalter und der Frühen Neuzeit miteinander?',
                    textEng: 'How did nobles communicate with each other during the Middle Ages and the Early Modern Period?',
                    order: 12,
                    content: "assets/img/WK_71.jpg",
                    elaborationGer: 'Schlecht ausgebaute Straßen, Wetterschwankungen, unbequeme Transportmittel sowie die ständige Gefahr von Überfällen zählten zu den täglichen Strapazen der Boten. Darüber hinaus ließ so mancher Empfänger seinen Zorn über ungünstige Nachrichten an ihnen aus.',
                    elaborationEng: 'Poorly developed roads, weather fluctuations, inconvenient means of transport and the constant danger of attacks were among the daily exertions of messengers. In addition to that, many of the recipients released their anger towards the messengers due to bad news.'
                }),
                this._connection.question.create({
                    id: 13,
                    textGer: 'Auf diesem Bild wird eine bedeutende Reliquie präsentiert. Um welche handelt es sich?',
                    textEng: 'On this picture a truely important relic is shown. What is it?',
                    order: 13,
                    content: "assets/img/WK_163.jpg",
                    elaborationGer: 'Beim Rock von Trier handelt es sich um das angebliche Gewand Jesu. Bis heute wird der Rock von Trier im Trierer Dom aufbewahrt.',
                    elaborationEng: 'The Seamless Robe of Jesus in Trier is said to have been worn by Jesus himself. To this day it is stored in the Cathedral of Trier.'
                }),
                this._connection.question.create({
                    id: 14,
                    textGer: 'Woher kennt man das rot eingefärbte Wappen heute?',
                    textEng: 'What is the red-coloured coat of arms associated with today?',
                    order: 14,
                    content: "assets/img/WK_130.jpg",
                    elaborationGer: 'Das sogenannte Fünf-Adler-Wappen ist heute das Wappen von Niederösterreich. Es geht auf die Babenberger zurück, weswegen der Heilige Leopold oft mit diesem Wappen dargestellt wird.',
                    elaborationEng: 'This coat of arms – which is nowadays the coat of arms of Lower Austria – can be traced back to the Babenberg family, which is why it often adorns depictions of Saint Leopold.'
                }),
                this._connection.question.create({
                    id: 15,
                    textGer: 'Wann und wo wurde Maximilian zum römisch-deutschen König gekrönt?',
                    textEng: 'When and where was Maximilian crowned King of the Romans?',
                    order: 15,
                    content: "assets/img/WK_197.jpg",
                    elaborationGer: 'Für das Festessen am 9. April 1486 in Aachen wurden keine Kosten und Mühen gescheut: Auf der Speisekarte stand ein Ochse, gefüllt mit einem Schwein, das wiederum mit Geflügel gefüllt war.',
                    elaborationEng: 'The effort of preparation for the feast on April 9th, 1486 in Aachen was quite big: an ox, stuffed with pork, which was stuffed with chicken was on the menu.'
                }),
                this._connection.question.create({
                    id: 16,
                    textGer: 'Wo wurde Maximilians Vater, Friedrich III., 1493 bestattet?',
                    textEng: 'Where was Frederick III, Maximilian’s father, buried in 1493?',
                    order: 16,
                    content: "assets/img/WK_213.jpg",
                    elaborationGer: 'Friedrich III. starb am 19. August 1493 in Linz. Sein Leichnam wurde nach Wien transportiert und dort im Dezember 1493 im Stephansdom bestattet. Nachdem 1513 sein Hochgrab – ebenfalls im Stephansdom – fertiggestellt worden war, wurde er umgebettet.',
                    elaborationEng: 'Frederick III died on 19th August 1493 in Linz. His body was transported to Vienna and buried in December of the same year at St Stephen’s Cathedral. His remains got exhumed in 1513 when his new tomb - also inside the cathedral - was finished.'
                })
            ]);
        });
    }

    private async createAnswers() {
        return this._connection.sequelize.transaction(t1 => {
            return Promise.all([
                this._connection.answer.create({
                    id: 1,
                    questionId: 1,
                    isCorrectAnswer: false,
                    textGer: 'Steinbock',
                    textEng: 'Capricorn',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 2,
                    questionId: 1,
                    isCorrectAnswer: false,
                    textGer: 'Löwe',
                    textEng: 'Leo',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 3,
                    questionId: 1,
                    isCorrectAnswer: true,
                    textGer: 'Widder',
                    textEng: 'Aries',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 4,
                    questionId: 1,
                    isCorrectAnswer: false,
                    textGer: 'Stier',
                    textEng: 'Taurus',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 5,
                    questionId: 2,
                    isCorrectAnswer: false,
                    textGer: 'Philipp und Johanna',
                    textEng: 'Philip and Joanna',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 6,
                    questionId: 2,
                    isCorrectAnswer: false,
                    textGer: 'Ludwig und Anna',
                    textEng: 'Louis and Anne',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 7,
                    questionId: 2,
                    isCorrectAnswer: false,
                    textGer: 'Rudolph und Margarete',
                    textEng: 'Rudolph and Margaret',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 8,
                    questionId: 2,
                    isCorrectAnswer: true,
                    textGer: 'Friedrich und Eleonore',
                    textEng: 'Frederick and Eleonor',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 9,
                    questionId: 3,
                    isCorrectAnswer: false,
                    textGer: 'Tiara',
                    textEng: 'tiara',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 10,
                    questionId: 3,
                    isCorrectAnswer: false,
                    textGer: 'Pileolus',
                    textEng: 'zucchetto',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 11,
                    questionId: 3,
                    isCorrectAnswer: true,
                    textGer: 'Kardinalshut',
                    textEng: 'galero',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 12,
                    questionId: 3,
                    isCorrectAnswer: false,
                    textGer: 'Bischofsmütze',
                    textEng: 'bishop’s mitre',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 13,
                    questionId: 4,
                    isCorrectAnswer: false,
                    textGer: 'Fußwaschung',
                    textEng: 'footwashing',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 14,
                    questionId: 4,
                    isCorrectAnswer: false,
                    textGer: 'Beichte',
                    textEng: 'confession',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 15,
                    questionId: 4,
                    isCorrectAnswer: true,
                    textGer: 'Taufe',
                    textEng: 'baptism',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 16,
                    questionId: 4,
                    isCorrectAnswer: false,
                    textGer: 'Beschneidung',
                    textEng: 'circumcision',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 17,
                    questionId: 5,
                    isCorrectAnswer: false,
                    textGer: 'zwei Mal',
                    textEng: 'two times',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 18,
                    questionId: 5,
                    isCorrectAnswer: false,
                    textGer: 'vier Mal',
                    textEng: 'four times',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 19,
                    questionId: 5,
                    isCorrectAnswer: true,
                    textGer: 'sechs Mal',
                    textEng: 'six times',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 20,
                    questionId: 5,
                    isCorrectAnswer: false,
                    textGer: 'acht Mal',
                    textEng: 'eight times',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 21,
                    questionId: 6,
                    isCorrectAnswer: true,
                    textGer: 'Gänsefedern',
                    textEng: 'goose quills',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 22,
                    questionId: 6,
                    isCorrectAnswer: false,
                    textGer: 'Wildknochen',
                    textEng: 'animal bones',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 23,
                    questionId: 6,
                    isCorrectAnswer: false,
                    textGer: 'Straußenfedern',
                    textEng: 'ostrich feathers',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 24,
                    questionId: 6,
                    isCorrectAnswer: false,
                    textGer: 'Nussholzstäbchen',
                    textEng: 'nutwood sticks',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 25,
                    questionId: 7,
                    isCorrectAnswer: false,
                    textGer: 'Briefmarken',
                    textEng: 'postal stamps',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 26,
                    questionId: 7,
                    isCorrectAnswer: false,
                    textGer: 'Adressaufkleber',
                    textEng: 'address labels',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 27,
                    questionId: 7,
                    isCorrectAnswer: false,
                    textGer: 'Stempel',
                    textEng: 'stamps',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 28,
                    questionId: 7,
                    isCorrectAnswer: true,
                    textGer: 'Siegel',
                    textEng: 'seals',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 29,
                    questionId: 8,
                    isCorrectAnswer: true,
                    textGer: 'Münzwerkstatt',
                    textEng: 'in the mint',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 30,
                    questionId: 8,
                    isCorrectAnswer: false,
                    textGer: 'Küche',
                    textEng: 'in the kitchen',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 31,
                    questionId: 8,
                    isCorrectAnswer: false,
                    textGer: 'Gericht',
                    textEng: 'at court',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 32,
                    questionId: 8,
                    isCorrectAnswer: false,
                    textGer: 'Waffenschmiede',
                    textEng: 'in the armoury',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 33,
                    questionId: 9,
                    isCorrectAnswer: false,
                    textGer: 'dem Reiten',
                    textEng: 'horseback riding',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 34,
                    questionId: 9,
                    isCorrectAnswer: true,
                    textGer: 'der Jagd',
                    textEng: 'hunting',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 35,
                    questionId: 9,
                    isCorrectAnswer: false,
                    textGer: 'dem Wandern',
                    textEng: 'hiking',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 36,
                    questionId: 9,
                    isCorrectAnswer: false,
                    textGer: 'der Hundezucht',
                    textEng: 'dog breeding',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 37,
                    questionId: 10,
                    isCorrectAnswer: false,
                    textGer: 'Korinthischer Helm',
                    textEng: 'corinthian helmet',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 38,
                    questionId: 10,
                    isCorrectAnswer: false,
                    textGer: 'Kübelhelm',
                    textEng: 'great helm',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 39,
                    questionId: 10,
                    isCorrectAnswer: true,
                    textGer: 'Stechhelm',
                    textEng: 'frog-mouth helmet',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 40,
                    questionId: 10,
                    isCorrectAnswer: false,
                    textGer: 'Bügelhelm',
                    textEng: 'barred helmet',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 41,
                    questionId: 11,
                    isCorrectAnswer: true,
                    textGer: 'Maria von Burgund',
                    textEng: 'Mary of Burgundy',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 42,
                    questionId: 11,
                    isCorrectAnswer: false,
                    textGer: 'Margarethe von Schottland',
                    textEng: 'Margaret of Scotland',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 43,
                    questionId: 11,
                    isCorrectAnswer: false,
                    textGer: 'Isabella von Kastilien',
                    textEng: 'Isabella of Castile',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 44,
                    questionId: 11,
                    isCorrectAnswer: false,
                    textGer: 'Beatrix von Aragón',
                    textEng: 'Beatrice of Naples',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 45,
                    questionId: 12,
                    isCorrectAnswer: false,
                    textGer: 'Brieftauben',
                    textEng: 'messenger pidgeons',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 46,
                    questionId: 12,
                    isCorrectAnswer: false,
                    textGer: 'Rauchzeichen',
                    textEng: 'smoke signals',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 47,
                    questionId: 12,
                    isCorrectAnswer: true,
                    textGer: 'Boten',
                    textEng: 'messengers',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 48,
                    questionId: 12,
                    isCorrectAnswer: false,
                    textGer: 'E-Mail',
                    textEng: 'e-mails',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 49,
                    questionId: 13,
                    isCorrectAnswer: false,
                    textGer: 'Jacke von Regensburg',
                    textEng: 'Divine Jacket of Regensburg',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 50,
                    questionId: 13,
                    isCorrectAnswer: true,
                    textGer: 'Rock von Trier',
                    textEng: 'Seamless Robe of Jesus in Trier',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 51,
                    questionId: 13,
                    isCorrectAnswer: false,
                    textGer: 'Hemd von Bamberg',
                    textEng: 'Blessed Shirt of Bamberg',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 52,
                    questionId: 13,
                    isCorrectAnswer: false,
                    textGer: 'Hose von Aachen',
                    textEng: 'Holy Trousers of Jesus in Aachen',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 53,
                    questionId: 14,
                    isCorrectAnswer: false,
                    textGer: 'Wappen von Oberösterreich',
                    textEng: 'coat of arms of Upper Austria',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 54,
                    questionId: 14,
                    isCorrectAnswer: false,
                    textGer: 'Wappen von Wien',
                    textEng: 'coat of arms of Vienna',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 55,
                    questionId: 14,
                    isCorrectAnswer: true,
                    textGer: 'Wappen von Niederösterreich',
                    textEng: 'coat of arms of Lower Austria',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 56,
                    questionId: 14,
                    isCorrectAnswer: false,
                    textGer: 'Wappen der Steiermark',
                    textEng: 'coat of arms of Styria',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 57,
                    questionId: 15,
                    isCorrectAnswer: false,
                    textGer: '1495 in Prag',
                    textEng: '1495 in Prague',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 58,
                    questionId: 15,
                    isCorrectAnswer: false,
                    textGer: '1490 in Wien',
                    textEng: '1490 in Vienna',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 59,
                    questionId: 15,
                    isCorrectAnswer: false,
                    textGer: '1492 in Stuhlweißenburg',
                    textEng: '1492 in Székesfehérvár',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 60,
                    questionId: 15,
                    isCorrectAnswer: true,
                    textGer: '1486 in Aachen',
                    textEng: '1486 in Aachen',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 61,
                    questionId: 16,
                    isCorrectAnswer: false,
                    textGer: 'Stiftskirche Klosterneuburg',
                    textEng: 'Klosterneuburg Monastery',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 62,
                    questionId: 16,
                    isCorrectAnswer: false,
                    textGer: 'Kapuzinergruft',
                    textEng: 'Imperial Crypt',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 63,
                    questionId: 16,
                    isCorrectAnswer: false,
                    textGer: 'Schottenkirche',
                    textEng: 'Scottish Abbey',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 64,
                    questionId: 16,
                    isCorrectAnswer: true,
                    textGer: 'Stephansdom',
                    textEng: 'St Stephen’s Cathedral',
                    numberOfAnsweredTimes: 0
                })
            ]);
        });
    }

    set connection(value: any) {
        this._connection = value;
    }
}
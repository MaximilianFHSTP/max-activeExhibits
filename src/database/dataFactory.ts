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
                    textEng: 'English In welchem Sternzeichen war Maximilian I. geboren?',
                    order: 1,
                    content: "assets/img/WK_13.jpg",
                    elaborationGer: 'Maximilian wurde am 22. März 1459 geboren. Es wird außerdem von einem Kometen berichtet, der zu Maximilians Geburt am Himmel sichtbar gewesen sein soll. Kometen wurden im Spätmittelalter und der Frühen Neuzeit als Vorzeichen betrachtet.',
                    elaborationEng: 'English Maximilian wurde am 22. März 1459 geboren. Es wird außerdem von einem Kometen berichtet, der zu Maximilians Geburt am Himmel sichtbar gewesen sein soll. Kometen wurden im Spätmittelalter und der Frühen Neuzeit als Vorzeichen betrachtet.'
                }),
                this._connection.question.create({
                    id: 2,
                    textGer: 'Wie hießen Maximilians Eltern?',
                    textEng: 'Wie hießen Maximilians Eltern?',
                    order: 2,
                    content: "assets/img/WK_8.jpg",
                    elaborationGer: 'Die Eltern Maximilians waren Kaiser Friedrich III. aus dem Hause Habsburg und Eleonore von Portugal. Bei der Kaiserkrönung in Rom im März 1452 segnete Papst Nikolaus V. die Ehe des Paares.',
                    elaborationEng: 'Die Eltern Maximilians waren Kaiser Friedrich III. aus dem Hause Habsburg und Eleonore von Portugal. Bei der Kaiserkrönung in Rom im März 1452 segnete Papst Nikolaus V. die Ehe des Paares.'
                }),
                this._connection.question.create({
                    id: 3,
                    textGer: 'Welche Kopfbedeckung ist hier rot eingefärbt?',
                    textEng: 'Welche Kopfbedeckung ist hier rot eingefärbt?',
                    order: 3,
                    content: "assets/img/WK_10.jpg",
                    elaborationGer: 'Der Kardinalshut ist ein Hut mit einer ungewöhnlich breiten Krempe und Quasten. Er wurde nur selten getragen und später auf den Sarg des jeweiligen Kardinals gelegt. Außerdem ist er oft als Wappenzier zu sehen.',
                    elaborationEng: 'Der Kardinalshut ist ein Hut mit einer ungewöhnlich breiten Krempe und Quasten. Er wurde nur selten getragen und später auf den Sarg des jeweiligen Kardinals gelegt. Außerdem ist er oft als Wappenzier zu sehen.'
                }),
                this._connection.question.create({
                    id: 4,
                    textGer: 'Welches Ritual wird hier dargestellt?',
                    textEng: 'Welches Ritual wird hier dargestellt?',
                    order: 4,
                    content: "assets/img/WK_21.jpg",
                    elaborationGer: 'Maximilian wurde in Wiener Neustadt getauft. Sein Taufpate war der Woiwode Nikolaus Ujlaki. Sein Namenspatron ist Maximilian von Lorch.',
                    elaborationEng: 'Maximilian wurde in Wiener Neustadt getauft. Sein Taufpate war der Woiwode Nikolaus Ujlaki. Sein Namenspatron ist Maximilian von Lorch.'
                }),
                this._connection.question.create({
                    id: 5,
                    textGer: 'Maximilian trägt einen Ehrenkranz. Wie oft ist er auf dem Bild zu sehen?',
                    textEng: 'Maximilian trägt einen Ehrenkranz. Wie oft ist er auf dem Bild zu sehen?',
                    order: 5,
                    content: "assets/img/WK_15.jpg",
                    elaborationGer: 'Maximilian übt sich hier spielerisch in verschiedenen ritterlichen wie etwa der Jagd oder dem Turnier.',
                    elaborationEng: 'Maximilian übt sich hier spielerisch in verschiedenen ritterlichen wie etwa der Jagd oder dem Turnier.'
                }),
                this._connection.question.create({
                    id: 6,
                    textGer: 'Welches Schreibwerkzeug benutzt Maximilian hier?',
                    textEng: 'Welches Schreibwerkzeug benutzt Maximilian hier?',
                    order: 6,
                    content: "assets/img/WK_18.jpg",
                    elaborationGer: 'Bis ins 19. Jahrhundert wurde mit Federkielen geschrieben, die hauptsächlich von Gänsen stammten. Die Federkiele wurden an der Spitze zugeschnitten und gespalten, um die Tinte aufnehmen zu können.',
                    elaborationEng: 'Bis ins 19. Jahrhundert wurde mit Federkielen geschrieben, die hauptsächlich von Gänsen stammten. Die Federkiele wurden an der Spitze zugeschnitten und gespalten, um die Tinte aufnehmen zu können.'
                }),
                this._connection.question.create({
                    id: 7,
                    textGer: 'Was ist hier auf den Schriftstücken rot markiert?',
                    textEng: 'Was ist hier auf den Schriftstücken rot markiert?',
                    order: 7,
                    content: "assets/img/WK_22.jpg",
                    elaborationGer: 'Siegel wurden zur Beglaubigung und zum Verschließen von Schriftstücken verwendet. Neben dem klassischen Wachssiegel gab es auch Oblatensiegel. Metallsiegel hingegen waren Kaiser und Papst vorbehalten.',
                    elaborationEng: 'Siegel wurden zur Beglaubigung und zum Verschließen von Schriftstücken verwendet. Neben dem klassischen Wachssiegel gab es auch Oblatensiegel. Metallsiegel hingegen waren Kaiser und Papst vorbehalten.'
                }),
                this._connection.question.create({
                    id: 8,
                    textGer: 'Wo ist Maximilian hier zu Gast?',
                    textEng: 'Wo ist Maximilian hier zu Gast?',
                    order: 8,
                    content: "assets/img/WK_32.jpg",
                    elaborationGer: 'Maximilian besucht hier eine Münzwerkstatt. Zu sehen ist der Herstellungsprozess von Münzen: dazu gehören beispielsweise das Prägen und das Abwiegen.',
                    elaborationEng: 'Maximilian besucht hier eine Münzwerkstatt. Zu sehen ist der Herstellungsprozess von Münzen: dazu gehören beispielsweise das Prägen und das Abwiegen.'
                }),
                this._connection.question.create({
                    id: 9,
                    textGer: 'Welchem Hobby ging Maximilian sehr gerne nach?',
                    textEng: 'Welchem Hobby ging Maximilian sehr gerne nach?',
                    order: 9,
                    content: "assets/img/WK_35.jpg",
                    elaborationGer: 'Für Adelige war die Teilnahme an der Jagd eine gesellschaftliche Konvention. Maximilian ließ sogar prächtige Handschriften zu diesem Thema anfertigen.',
                    elaborationEng: 'Für Adelige war die Teilnahme an der Jagd eine gesellschaftliche Konvention. Maximilian ließ sogar prächtige Handschriften zu diesem Thema anfertigen.'
                }),
                this._connection.question.create({
                    id: 10,
                    textGer: 'Welcher Helm ist hier rot eingefärbt?',
                    textEng: 'Welcher Helm ist hier rot eingefärbt?',
                    order: 10,
                    content: "assets/img/WK_42.jpg",
                    elaborationGer: 'Zu unterschiedlichen Zeiten waren verschiedene Helmformen in Gebrauch. Genau wie der Brustharnisch waren sie Teil der Rüstung. In Museen sind heute noch viele Rüstungen zu sehen.',
                    elaborationEng: 'Zu unterschiedlichen Zeiten waren verschiedene Helmformen in Gebrauch. Genau wie der Brustharnisch waren sie Teil der Rüstung. In Museen sind heute noch viele Rüstungen zu sehen.'
                }),
                this._connection.question.create({
                    id: 11,
                    textGer: 'Wie hieß Maximilians erste Ehefrau?',
                    textEng: 'Wie hieß Maximilians erste Ehefrau?',
                    order: 11,
                    content: "assets/img/WK_53.jpg",
                    elaborationGer: 'Am 19. August 1477 heirateten Maximilian und Maria von Burgund. Das Leben am burgundischen Hof prägte Maximilian sehr stark. Maria von Burgund starb bereits 1482 bei einem Jagdunfall.',
                    elaborationEng: 'Am 19. August 1477 heirateten Maximilian und Maria von Burgund. Das Leben am burgundischen Hof prägte Maximilian sehr stark. Maria von Burgund starb bereits 1482 bei einem Jagdunfall.'
                }),
                this._connection.question.create({
                    id: 12,
                    textGer: 'Wie kommunizierten die Fürsten im Mittelalter und der Frühen Neuzeit miteinander?',
                    textEng: 'Wie kommunizierten die Fürsten im Mittelalter und der Frühen Neuzeit miteinander?',
                    order: 12,
                    content: "assets/img/WK_71.jpg",
                    elaborationGer: 'Schlecht ausgebaute Straßen, Wetterschwankungen, unbequeme Transportmittel sowie die ständige Gefahr von Überfällen zählten zu den täglichen Strapazen der Boten. Darüber hinaus ließ so mancher Empfänger seinen Zorn über ungünstige Nachrichten an ihnen aus.',
                    elaborationEng: 'Schlecht ausgebaute Straßen, Wetterschwankungen, unbequeme Transportmittel sowie die ständige Gefahr von Überfällen zählten zu den täglichen Strapazen der Boten. Darüber hinaus ließ so mancher Empfänger seinen Zorn über ungünstige Nachrichten an ihnen aus.'
                }),
                this._connection.question.create({
                    id: 13,
                    textGer: 'Auf diesem Bild wird eine bedeutende Reliquie präsentiert. Um welche handelt es sich?',
                    textEng: 'Auf diesem Bild wird eine bedeutende Reliquie präsentiert. Um welche handelt es sich?',
                    order: 13,
                    content: "assets/img/WK_163.jpg",
                    elaborationGer: 'Beim Rock von Trier handelt es sich um das angebliche Gewand Jesu. Bis heute wird der Rock von Trier im Trierer Dom aufbewahrt.',
                    elaborationEng: 'Beim Rock von Trier handelt es sich um das angebliche Gewand Jesu. Bis heute wird der Rock von Trier im Trierer Dom aufbewahrt.'
                }),
                this._connection.question.create({
                    id: 14,
                    textGer: 'Woher kennt man das rot eingefärbte Wappen heute?',
                    textEng: 'Woher kennt man das rot eingefärbte Wappen heute?',
                    order: 14,
                    content: "assets/img/WK_130.jpg",
                    elaborationGer: 'Das sogenannte Fünf-Adler-Wappen ist heute das Wappen von Niederösterreich. Es geht auf die Babenberger zurück, weswegen der Heilige Leopold oft mit diesem Wappen dargestellt wird.',
                    elaborationEng: 'Das sogenannte Fünf-Adler-Wappen ist heute das Wappen von Niederösterreich. Es geht auf die Babenberger zurück, weswegen der Heilige Leopold oft mit diesem Wappen dargestellt wird.'
                }),
                this._connection.question.create({
                    id: 15,
                    textGer: 'Wann und wo wurde Maximilian zum römisch-deutschen König gekrönt?',
                    textEng: 'Wann und wo wurde Maximilian zum römisch-deutschen König gekrönt?',
                    order: 15,
                    content: "assets/img/WK_197.jpg",
                    elaborationGer: 'Für das Festessen am 9. April 1486 in Aachen wurden keine Kosten und Mühen gescheut: Auf der Speisekarte stand ein Ochse, gefüllt mit einem Schwein, das wiederum mit Geflügel gefüllt war.',
                    elaborationEng: 'Für das Festessen am 9. April 1486 in Aachen wurden keine Kosten und Mühen gescheut: Auf der Speisekarte stand ein Ochse, gefüllt mit einem Schwein, das wiederum mit Geflügel gefüllt war.'
                }),
                this._connection.question.create({
                    id: 16,
                    textGer: 'Wo wurde Maximilians Vater, Friedrich III., 1493 bestattet?',
                    textEng: 'Wo wurde Maximilians Vater, Friedrich III., 1493 bestattet?',
                    order: 16,
                    content: "assets/img/WK_213.jpg",
                    elaborationGer: 'Friedrich III. starb am 19. August 1493 in Linz. Sein Leichnam wurde nach Wien transportiert und dort im Dezember 1493 im Stephansdom bestattet. Nachdem 1513 sein Hochgrab – ebenfalls im Stephansdom – fertiggestellt worden war, wurde er umgebettet.',
                    elaborationEng: 'Friedrich III. starb am 19. August 1493 in Linz. Sein Leichnam wurde nach Wien transportiert und dort im Dezember 1493 im Stephansdom bestattet. Nachdem 1513 sein Hochgrab – ebenfalls im Stephansdom – fertiggestellt worden war, wurde er umgebettet.'
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
                    textEng: 'ESteinbock',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 2,
                    questionId: 1,
                    isCorrectAnswer: false,
                    textGer: 'Löwe',
                    textEng: 'ELöwe',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 3,
                    questionId: 1,
                    isCorrectAnswer: true,
                    textGer: 'Widder',
                    textEng: 'EWidder',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 4,
                    questionId: 1,
                    isCorrectAnswer: false,
                    textGer: 'Stier',
                    textEng: 'EStier',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 5,
                    questionId: 2,
                    isCorrectAnswer: false,
                    textGer: 'Philipp und Johanna',
                    textEng: 'Philipp und Johanna',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 6,
                    questionId: 2,
                    isCorrectAnswer: false,
                    textGer: 'Ludwig und Anna',
                    textEng: 'Ludwig und Anna',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 7,
                    questionId: 2,
                    isCorrectAnswer: false,
                    textGer: 'Rudolph und Margarete',
                    textEng: 'Rudolph und Margarete',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 8,
                    questionId: 2,
                    isCorrectAnswer: true,
                    textGer: 'Friedrich und Eleonore',
                    textEng: 'Friedrich und Eleonore',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 9,
                    questionId: 3,
                    isCorrectAnswer: false,
                    textGer: 'Tiara',
                    textEng: 'Tiara',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 10,
                    questionId: 3,
                    isCorrectAnswer: false,
                    textGer: 'Pileolus',
                    textEng: 'Pileolus',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 11,
                    questionId: 3,
                    isCorrectAnswer: true,
                    textGer: 'Kardinalshut',
                    textEng: 'Kardinalshut',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 12,
                    questionId: 3,
                    isCorrectAnswer: false,
                    textGer: 'Bischofsmütze',
                    textEng: 'Bischofsmütze',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 13,
                    questionId: 4,
                    isCorrectAnswer: false,
                    textGer: 'Fußwaschung',
                    textEng: 'Fußwaschung',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 14,
                    questionId: 4,
                    isCorrectAnswer: false,
                    textGer: 'Beichte',
                    textEng: 'Beichte',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 15,
                    questionId: 4,
                    isCorrectAnswer: true,
                    textGer: 'Taufe',
                    textEng: 'Taufe',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 16,
                    questionId: 4,
                    isCorrectAnswer: false,
                    textGer: 'Beschneidung',
                    textEng: 'Beschneidung',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 17,
                    questionId: 5,
                    isCorrectAnswer: false,
                    textGer: 'zwei Mal',
                    textEng: 'zwei Mal',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 18,
                    questionId: 5,
                    isCorrectAnswer: false,
                    textGer: 'vier Mal',
                    textEng: 'vier Mal',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 19,
                    questionId: 5,
                    isCorrectAnswer: true,
                    textGer: 'sechs Mal',
                    textEng: 'sechs Mal',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 20,
                    questionId: 5,
                    isCorrectAnswer: false,
                    textGer: 'acht Mal',
                    textEng: 'acht Mal',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 21,
                    questionId: 6,
                    isCorrectAnswer: true,
                    textGer: 'Gänsefedern',
                    textEng: 'Gänsefedern',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 22,
                    questionId: 6,
                    isCorrectAnswer: false,
                    textGer: 'Wildknochen',
                    textEng: 'Wildknochen',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 23,
                    questionId: 6,
                    isCorrectAnswer: false,
                    textGer: 'Straußenfedern',
                    textEng: 'Straußenfedern',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 24,
                    questionId: 6,
                    isCorrectAnswer: false,
                    textGer: 'Nussholzstäbchen',
                    textEng: 'Nussholzstäbchen',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 25,
                    questionId: 7,
                    isCorrectAnswer: false,
                    textGer: 'Briefmarken',
                    textEng: 'Briefmarken',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 26,
                    questionId: 7,
                    isCorrectAnswer: false,
                    textGer: 'Adressaufkleber',
                    textEng: 'Adressaufkleber',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 27,
                    questionId: 7,
                    isCorrectAnswer: false,
                    textGer: 'Stempel',
                    textEng: 'Stempel',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 28,
                    questionId: 7,
                    isCorrectAnswer: true,
                    textGer: 'Siegel',
                    textEng: 'Siegel',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 29,
                    questionId: 8,
                    isCorrectAnswer: true,
                    textGer: 'Münzwerkstatt',
                    textEng: 'Münzwerkstatt',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 30,
                    questionId: 8,
                    isCorrectAnswer: false,
                    textGer: 'Küche',
                    textEng: 'Küche',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 31,
                    questionId: 8,
                    isCorrectAnswer: false,
                    textGer: 'Gericht',
                    textEng: 'Gericht',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 32,
                    questionId: 8,
                    isCorrectAnswer: false,
                    textGer: 'Waffenschmiede',
                    textEng: 'Waffenschmiede',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 33,
                    questionId: 9,
                    isCorrectAnswer: false,
                    textGer: 'dem Reiten',
                    textEng: 'dem Reiten',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 34,
                    questionId: 9,
                    isCorrectAnswer: true,
                    textGer: 'der Jagd',
                    textEng: 'der Jagd',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 35,
                    questionId: 9,
                    isCorrectAnswer: false,
                    textGer: 'dem Wandern',
                    textEng: 'dem Wandern',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 36,
                    questionId: 9,
                    isCorrectAnswer: false,
                    textGer: 'der Hundezucht',
                    textEng: 'der Hundezucht',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 37,
                    questionId: 10,
                    isCorrectAnswer: false,
                    textGer: 'Korinthischer Helm',
                    textEng: 'Korinthischer Helm',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 38,
                    questionId: 10,
                    isCorrectAnswer: false,
                    textGer: 'Kübelhelm',
                    textEng: 'Kübelhelm',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 39,
                    questionId: 10,
                    isCorrectAnswer: true,
                    textGer: 'Stechhelm',
                    textEng: 'Stechhelm',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 40,
                    questionId: 10,
                    isCorrectAnswer: false,
                    textGer: 'Bügelhelm',
                    textEng: 'Bügelhelm',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 41,
                    questionId: 11,
                    isCorrectAnswer: true,
                    textGer: 'Maria von Burgund',
                    textEng: 'Maria von Burgund',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 42,
                    questionId: 11,
                    isCorrectAnswer: false,
                    textGer: 'Margarethe von Schottland',
                    textEng: 'Margarethe von Schottland',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 43,
                    questionId: 11,
                    isCorrectAnswer: false,
                    textGer: 'Isabella von Kastilien',
                    textEng: 'Isabella von Kastilien',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 44,
                    questionId: 11,
                    isCorrectAnswer: false,
                    textGer: 'Beatrix von Aragón',
                    textEng: 'Beatrix von Aragón',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 45,
                    questionId: 12,
                    isCorrectAnswer: false,
                    textGer: 'Brieftauben',
                    textEng: 'Brieftauben',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 46,
                    questionId: 12,
                    isCorrectAnswer: false,
                    textGer: 'Rauchzeichen',
                    textEng: 'Rauchzeichen',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 47,
                    questionId: 12,
                    isCorrectAnswer: true,
                    textGer: 'Boten',
                    textEng: 'Boten',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 48,
                    questionId: 12,
                    isCorrectAnswer: false,
                    textGer: 'E-Mail',
                    textEng: 'E-Mail',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 49,
                    questionId: 13,
                    isCorrectAnswer: false,
                    textGer: 'Jacke von Regensburg',
                    textEng: 'Jacke von Regensburg',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 50,
                    questionId: 13,
                    isCorrectAnswer: true,
                    textGer: 'Rock von Trier',
                    textEng: 'Rock von Trier',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 51,
                    questionId: 13,
                    isCorrectAnswer: false,
                    textGer: 'Hemd von Bamberg',
                    textEng: 'Hemd von Bamberg',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 52,
                    questionId: 13,
                    isCorrectAnswer: false,
                    textGer: 'Hose von Aachen',
                    textEng: 'Hose von Aachen',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 53,
                    questionId: 14,
                    isCorrectAnswer: false,
                    textGer: 'Wappen von Oberösterreich',
                    textEng: 'Wappen von Oberösterreich',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 54,
                    questionId: 14,
                    isCorrectAnswer: false,
                    textGer: 'Wappen von Wien',
                    textEng: 'Wappen von Wien',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 55,
                    questionId: 14,
                    isCorrectAnswer: true,
                    textGer: 'Wappen von Niederösterreich',
                    textEng: 'Wappen von Niederösterreich',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 56,
                    questionId: 14,
                    isCorrectAnswer: false,
                    textGer: 'Wappen der Steiermark',
                    textEng: 'Wappen der Steiermark',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 57,
                    questionId: 15,
                    isCorrectAnswer: false,
                    textGer: '1495 in Prag',
                    textEng: '1495 in Prag',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 58,
                    questionId: 15,
                    isCorrectAnswer: false,
                    textGer: '1490 in Wien',
                    textEng: '1490 in Wien',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 59,
                    questionId: 15,
                    isCorrectAnswer: false,
                    textGer: '1492 in Stuhlweißenburg',
                    textEng: '1492 in Stuhlweißenburg',
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
                    textEng: 'Stiftskirche Klosterneuburg',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 62,
                    questionId: 16,
                    isCorrectAnswer: false,
                    textGer: 'Kapuzinergruft',
                    textEng: 'Kapuzinergruft',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 63,
                    questionId: 16,
                    isCorrectAnswer: false,
                    textGer: 'Schottenkirche',
                    textEng: 'Schottenkirche',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 64,
                    questionId: 16,
                    isCorrectAnswer: true,
                    textGer: 'Stephansdom',
                    textEng: 'Stephansdom',
                    numberOfAnsweredTimes: 0
                })
            ]);
        });
    }

    set connection(value: any) {
        this._connection = value;
    }
}
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
                    text: 'In welchem Sternzeichen war Maximilian I. geboren?',
                    order: 1,
                    elaboration: 'Maximilian wurde am 22. März 1459 geboren. Es wird außerdem von einem Kometen berichtet, der zu Maximilians Geburt am Himmel sichtbar gewesen sein soll. Kometen wurden im Spätmittelalter und der Frühen Neuzeit als Vorzeichen betrachtet.'
                }),
                this._connection.question.create({
                    id: 2,
                    text: 'Wie hießen Maximilians Eltern?',
                    order: 2,
                    elaboration: 'Die Eltern Maximilians waren Kaiser Friedrich III. aus dem Hause Habsburg und Eleonore von Portugal. Bei der Kaiserkrönung in Rom im März 1452 segnete Papst Nikolaus V. die Ehe des Paares.'
                }),
                this._connection.question.create({
                    id: 3,
                    text: 'Welche Kopfbedeckung ist hier rot eingefärbt?',
                    order: 3,
                    elaboration: 'Der Kardinalshut ist ein Hut mit einer ungewöhnlich breiten Krempe und Quasten. Er wurde nur selten getragen und später auf den Sarg des jeweiligen Kardinals gelegt. Außerdem ist er oft als Wappenzier zu sehen.'
                }),
                this._connection.question.create({
                    id: 4,
                    text: 'Welches Ritual wird hier dargestellt?',
                    order: 4,
                    elaboration: 'Maximilian wurde in Wiener Neustadt getauft. Sein Taufpate war der Woiwode Nikolaus Ujlaki. Sein Namenspatron ist Maximilian von Lorch.'
                }),
                this._connection.question.create({
                    id: 5,
                    text: 'Maximilian trägt einen Ehrenkranz. Wie oft ist er auf dem Bild zu sehen?',
                    order: 5,
                    elaboration: 'Maximilian übt sich hier spielerisch in verschiedenen ritterlichen wie etwa der Jagd oder dem Turnier.'
                }),
                this._connection.question.create({
                    id: 6,
                    text: 'Welches Schreibwerkzeug benutzt Maximilian hier?',
                    order: 6,
                    elaboration: 'Bis ins 19. Jahrhundert wurde mit Federkielen geschrieben, die hauptsächlich von Gänsen stammten. Die Federkiele wurden an der Spitze zugeschnitten und gespalten, um die Tinte aufnehmen zu können.'
                }),
                this._connection.question.create({
                    id: 7,
                    text: 'Was ist hier auf den Schriftstücken rot markiert?',
                    order: 7,
                    elaboration: 'Siegel wurden zur Beglaubigung und zum Verschließen von Schriftstücken verwendet. Neben dem klassischen Wachssiegel gab es auch Oblatensiegel. Metallsiegel hingegen waren Kaiser und Papst vorbehalten.'
                }),
                this._connection.question.create({
                    id: 8,
                    text: 'Wo ist Maximilian hier zu Gast?',
                    order: 8,
                    elaboration: 'Maximilian besucht hier eine Münzwerkstatt. Zu sehen ist der Herstellungsprozess von Münzen: dazu gehören beispielsweise das Prägen und das Abwiegen.'
                }),
                this._connection.question.create({
                    id: 9,
                    text: 'Welchem Hobby ging Maximilian sehr gerne nach?',
                    order: 9,
                    elaboration: 'Für Adelige war die Teilnahme an der Jagd eine gesellschaftliche Konvention. Maximilian ließ sogar prächtige Handschriften zu diesem Thema anfertigen.'
                }),
                this._connection.question.create({
                    id: 10,
                    text: 'Welcher Helm ist hier rot eingefärbt?',
                    order: 10,
                    elaboration: 'Zu unterschiedlichen Zeiten waren verschiedene Helmformen in Gebrauch. Genau wie der Brustharnisch waren sie Teil der Rüstung. In Museen sind heute noch viele Rüstungen zu sehen.'
                }),
                this._connection.question.create({
                    id: 11,
                    text: 'Wie hieß Maximilians erste Ehefrau?',
                    order: 11,
                    elaboration: 'Am 19. August 1477 heirateten Maximilian und Maria von Burgund. Das Leben am burgundischen Hof prägte Maximilian sehr stark. Maria von Burgund starb bereits 1482 bei einem Jagdunfall.'
                }),
                this._connection.question.create({
                    id: 12,
                    text: 'Wie kommunizierten die Fürsten im Mittelalter und der Frühen Neuzeit miteinander?',
                    order: 12,
                    elaboration: 'Schlecht ausgebaute Straßen, Wetterschwankungen, unbequeme Transportmittel sowie die ständige Gefahr von Überfällen zählten zu den täglichen Strapazen der Boten. Darüber hinaus ließ so mancher Empfänger seinen Zorn über ungünstige Nachrichten an ihnen aus.'
                }),
                this._connection.question.create({
                    id: 13,
                    text: 'Auf diesem Bild wird eine bedeutende Reliquie präsentiert. Um welche handelt es sich?',
                    order: 13,
                    elaboration: 'Beim Rock von Trier handelt es sich um das angebliche Gewand Jesu. Bis heute wird der Rock von Trier im Trierer Dom aufbewahrt.'
                }),
                this._connection.question.create({
                    id: 14,
                    text: 'Woher kennt man das rot eingefärbte Wappen heute?',
                    order: 14,
                    elaboration: 'Das sogenannte Fünf-Adler-Wappen ist heute das Wappen von Niederösterreich. Es geht auf die Babenberger zurück, weswegen der Heilige Leopold oft mit diesem Wappen dargestellt wird.'
                }),
                this._connection.question.create({
                    id: 15,
                    text: 'Wann und wo wurde Maximilian zum römisch-deutschen König gekrönt?',
                    order: 15,
                    elaboration: 'Für das Festessen am 9. April 1486 in Aachen wurden keine Kosten und Mühen gescheut: Auf der Speisekarte stand ein Ochse, gefüllt mit einem Schwein, das wiederum mit Geflügel gefüllt war.'
                }),
                this._connection.question.create({
                    id: 16,
                    text: 'Wo wurde Maximilians Vater, Friedrich III., 1493 bestattet?',
                    order: 16,
                    elaboration: 'Friedrich III. starb am 19. August 1493 in Linz. Sein Leichnam wurde nach Wien transportiert und dort im Dezember 1493 im Stephansdom bestattet. Nachdem 1513 sein Hochgrab – ebenfalls im Stephansdom – fertiggestellt worden war, wurde er umgebettet.'
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
                    text: 'Steinbock',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 2,
                    questionId: 1,
                    isCorrectAnswer: false,
                    text: 'Löwe',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 3,
                    questionId: 1,
                    isCorrectAnswer: true,
                    text: 'Widder',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 4,
                    questionId: 1,
                    isCorrectAnswer: false,
                    text: 'Stier',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 5,
                    questionId: 2,
                    isCorrectAnswer: false,
                    text: 'Philipp und Johanna',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 6,
                    questionId: 2,
                    isCorrectAnswer: false,
                    text: 'Ludwig und Anna',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 7,
                    questionId: 2,
                    isCorrectAnswer: false,
                    text: 'Rudolph und Margarete',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 8,
                    questionId: 2,
                    isCorrectAnswer: true,
                    text: 'Friedrich und Eleonore',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 9,
                    questionId: 3,
                    isCorrectAnswer: false,
                    text: 'Tiara',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 10,
                    questionId: 3,
                    isCorrectAnswer: false,
                    text: 'Pileolus',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 11,
                    questionId: 3,
                    isCorrectAnswer: true,
                    text: 'Kardinalshut',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 12,
                    questionId: 3,
                    isCorrectAnswer: false,
                    text: 'Bischofsmütze',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 13,
                    questionId: 4,
                    isCorrectAnswer: false,
                    text: 'Fußwaschung',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 14,
                    questionId: 4,
                    isCorrectAnswer: false,
                    text: 'Beichte',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 15,
                    questionId: 4,
                    isCorrectAnswer: true,
                    text: 'Taufe',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 16,
                    questionId: 4,
                    isCorrectAnswer: false,
                    text: 'Beschneidung',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 17,
                    questionId: 5,
                    isCorrectAnswer: false,
                    text: 'zwei Mal',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 18,
                    questionId: 5,
                    isCorrectAnswer: false,
                    text: 'vier Mal',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 19,
                    questionId: 5,
                    isCorrectAnswer: true,
                    text: 'sechs Mal',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 20,
                    questionId: 5,
                    isCorrectAnswer: false,
                    text: 'acht Mal',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 21,
                    questionId: 6,
                    isCorrectAnswer: true,
                    text: 'Gänsefedern',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 22,
                    questionId: 6,
                    isCorrectAnswer: false,
                    text: 'Wildknochen',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 23,
                    questionId: 6,
                    isCorrectAnswer: false,
                    text: 'Straußenfedern',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 24,
                    questionId: 6,
                    isCorrectAnswer: false,
                    text: 'Nussholzstäbchen',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 25,
                    questionId: 7,
                    isCorrectAnswer: false,
                    text: 'Briefmarken',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 26,
                    questionId: 7,
                    isCorrectAnswer: false,
                    text: 'Adressaufkleber',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 27,
                    questionId: 7,
                    isCorrectAnswer: false,
                    text: 'Stempel',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 28,
                    questionId: 7,
                    isCorrectAnswer: true,
                    text: 'Siegel',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 29,
                    questionId: 8,
                    isCorrectAnswer: true,
                    text: 'Münzwerkstatt',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 30,
                    questionId: 8,
                    isCorrectAnswer: false,
                    text: 'Küche',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 31,
                    questionId: 8,
                    isCorrectAnswer: false,
                    text: 'Gericht',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 32,
                    questionId: 8,
                    isCorrectAnswer: false,
                    text: 'Waffenschmiede',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 33,
                    questionId: 9,
                    isCorrectAnswer: false,
                    text: 'dem Reiten',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 34,
                    questionId: 9,
                    isCorrectAnswer: true,
                    text: 'der Jagd',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 35,
                    questionId: 9,
                    isCorrectAnswer: false,
                    text: 'dem Wandern',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 36,
                    questionId: 9,
                    isCorrectAnswer: false,
                    text: 'der Hundezucht',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 37,
                    questionId: 10,
                    isCorrectAnswer: false,
                    text: 'Korinthischer Helm',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 38,
                    questionId: 10,
                    isCorrectAnswer: false,
                    text: 'Kübelhelm',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 39,
                    questionId: 10,
                    isCorrectAnswer: true,
                    text: 'Stechhelm',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 40,
                    questionId: 10,
                    isCorrectAnswer: false,
                    text: 'Bügelhelm',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 41,
                    questionId: 11,
                    isCorrectAnswer: true,
                    text: 'Maria von Burgund',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 42,
                    questionId: 11,
                    isCorrectAnswer: false,
                    text: 'Margarethe von Schottland',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 43,
                    questionId: 11,
                    isCorrectAnswer: false,
                    text: 'Isabella von Kastilien',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 44,
                    questionId: 11,
                    isCorrectAnswer: false,
                    text: 'Beatrix von Aragón',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 45,
                    questionId: 12,
                    isCorrectAnswer: false,
                    text: 'Brieftauben',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 46,
                    questionId: 12,
                    isCorrectAnswer: false,
                    text: 'Rauchzeichen',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 47,
                    questionId: 12,
                    isCorrectAnswer: true,
                    text: 'Boten',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 48,
                    questionId: 12,
                    isCorrectAnswer: false,
                    text: 'E-Mail',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 49,
                    questionId: 13,
                    isCorrectAnswer: false,
                    text: 'Jacke von Regensburg',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 50,
                    questionId: 13,
                    isCorrectAnswer: true,
                    text: 'Rock von Trier',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 51,
                    questionId: 13,
                    isCorrectAnswer: false,
                    text: 'Hemd von Bamberg',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 52,
                    questionId: 13,
                    isCorrectAnswer: false,
                    text: 'Hose von Aachen',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 53,
                    questionId: 14,
                    isCorrectAnswer: false,
                    text: 'Wappen von Oberösterreich',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 54,
                    questionId: 14,
                    isCorrectAnswer: false,
                    text: 'Wappen von Wien',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 55,
                    questionId: 14,
                    isCorrectAnswer: true,
                    text: 'Wappen von Niederösterreich',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 56,
                    questionId: 14,
                    isCorrectAnswer: false,
                    text: 'Wappen der Steiermark',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 57,
                    questionId: 15,
                    isCorrectAnswer: false,
                    text: '1495 in Prag',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 58,
                    questionId: 15,
                    isCorrectAnswer: false,
                    text: '1490 in Wien',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 59,
                    questionId: 15,
                    isCorrectAnswer: false,
                    text: '1492 in Stuhlweißenburg',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 60,
                    questionId: 15,
                    isCorrectAnswer: true,
                    text: '1486 in Aachen',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 61,
                    questionId: 16,
                    isCorrectAnswer: false,
                    text: 'Stiftskirche Klosterneuburgg',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 62,
                    questionId: 16,
                    isCorrectAnswer: false,
                    text: 'Kapuzinergruft',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 63,
                    questionId: 16,
                    isCorrectAnswer: false,
                    text: 'Schottenkirche',
                    numberOfAnsweredTimes: 0
                }),
                this._connection.answer.create({
                    id: 64,
                    questionId: 16,
                    isCorrectAnswer: true,
                    text: 'Stephansdom',
                    numberOfAnsweredTimes: 0
                })
            ]);
        });
    }

    set connection(value: any) {
        this._connection = value;
    }
}
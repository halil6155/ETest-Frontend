export interface QuestionListModel{
    id: number;
    text: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    createdOn: Date;
    modifiedOn?: Date;
    userName?: string;
}
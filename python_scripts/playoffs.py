import boto3
import csv
import json
from boto3.dynamodb.conditions import Key, Attr

db_region = "us-west-1"
db_officials = "OfficialInfo"
db_playoff_games = "PlayoffGames"
db_playoff_assignments = "PlayoffAssignments"

file_officials_info = "OfficialsInfo.csv"
file_playoff_history = "PlayoffHistory.csv"

""" Query for officials """


def fetchOfficials():
    officials_list = []
    dynamodb = boto3.resource('dynamodb', region_name=db_region)
    table = dynamodb.Table(db_officials)
    response = table.scan()
    for official in response['Items']:
        officials_list.append({"position": official["position"], "number": official["number"],
                               "firstName": official["firstName"], "lastName": official["lastName"]})
        print("{}{}  {} {}".format(
            official['position'], official['number'], official['firstName'], official['lastName']))


def fetchPlayoffGames():
    dynamodb = boto3.resource('dynamodb', region_name=db_region)
    table = dynamodb.Table(db_playoff_games)
    response = table.scan()
    for game in response['Items']:
        print("{} ({})  {}@{}".format(
            game['date'], game['round'], game['away'], game['home']))


def fetchGameCrew(gameId):
    dynamodb = boto3.resource('dynamodb', region_name=db_region)
    table = dynamodb.Table(db_playoff_games)
    response = table.scan(FilterExpression=Key('gameId').eq(gameId))
    for assignment in response['Items']:
        print("R: {}".format(assignment['crew']['R']))
        print("U: {}".format(assignment['crew']['U']))
        print("DJ: {}".format(assignment['crew']['DJ']))
        print("LJ: {}".format(assignment['crew']['LJ']))
        print("FJ: {}".format(assignment['crew']['FJ']))
        print("SJ: {}".format(assignment['crew']['SJ']))
        print("BJ: {}".format(assignment['crew']['BJ']))
        print("ALT-R: {}".format(assignment['crew']['ALT-R']))
        print("ALT-U: {}".format(assignment['crew']['ALT-U']))
        print("ALT-DJ: {}".format(assignment['crew']['ALT-DJ']))
        print("ALT-LJ: {}".format(assignment['crew']['ALT-LJ']))
        print("ALT-FJ: {}".format(assignment['crew']['ALT-FJ']))
        print("ALT-SJ: {}".format(assignment['crew']['ALT-SJ']))
        print("ALT-BJ: {}".format(assignment['crew']['ALT-BJ']))


""" Lambda response format """


def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
        },
    }


""" Persist the game information in the database """


def storeOfficial(official):
    try:
        dynamodb = boto3.resource('dynamodb', region_name=db_region)
        table = dynamodb.Table(db_officials)
        table.put_item(Item={
            'officialId': official["officialId"],
            'position': official["position"],
            'number': official['number'],
            'firstName': official['firstName'],
            'lastName': official['lastName'],
            'startYear': official['startYear'],
            'notes': official['notes']
        })

        table = dynamodb.Table(db_playoff_assignments)
        table.put_item(Item={
            'officialId': official["officialId"],
            'assignments': []
        })
    except KeyError:
        print("Exception storing data")


def storePlayoffGame(playoffGame):
    try:
        crew = {
            "R": playoffGame['REFEREE'],
            "U": playoffGame['UMPIRE'],
            "DJ": playoffGame['DOWNJUDGE'],
            "LJ": playoffGame['LINEJUDGE'],
            "FJ": playoffGame['FIELDJUDGE'],
            "SJ": playoffGame['SIDEJUDGE'],
            "BJ": playoffGame['BACKJUDGE'],
            "ALT-R": playoffGame['ALT-REFEREE'],
            "ALT-U": playoffGame['ALT-UMPIRE'],
            "ALT-DJ": playoffGame['ALT-DOWNJUDGE'],
            "ALT-LJ": playoffGame['ALT-LINEJUDGE'],
            "ALT-FJ": playoffGame['ALT-FIELDJUDGE'],
            "ALT-SJ": playoffGame['ALT-SIDEJUDGE'],
            "ALT-BJ": playoffGame['ALT-BACKJUDGE']
        }

        dynamodb = boto3.resource('dynamodb', region_name=db_region)
        table = dynamodb.Table(db_playoff_games)
        table.put_item(Item={
            'gameId': playoffGame['GAMEID'],
            'round': playoffGame['ROUND'],
            'awayTeam': playoffGame['AWAY'],
            'homeTeam': playoffGame['HOME'],
            'tv': playoffGame['TV'],
            'crew': crew,
            'notes': ''
        })

        assignment = {"gameId": playoffGame['GAMEID'],
                      "round": playoffGame['ROUND']}

        storeAssignment(crew, assignment)
    except KeyError as e:
        print("Exception storing data: {}".format(e))


def storeAssignment(crew, assignment):
    print("ASSIGNMENT: {} - R:{}".format(assignment, crew['R']))
    try:
        dynamodb = boto3.resource('dynamodb', region_name=db_region)
        table = dynamodb.Table(db_playoff_assignments)

        for pos in ['R', 'U', 'DJ', 'LJ', 'FJ', 'SJ', 'BJ', 'ALT-R', 'ALT-U', 'ALT-DJ', 'ALT-LJ', 'ALT-FJ', 'ALT-SJ', 'ALT-BJ']:
            print('ASSIGNING for: {}'.format(crew[pos]))
            assignment['pos'] = pos
            if crew[pos] != None and crew[pos] != "":
                table.update_item(
                    Key={
                        'officialId': crew[pos],
                    },
                    UpdateExpression="SET assignments=list_append(assignments, :a)",
                    ExpressionAttributeValues={
                        ':a': [assignment]
                    },
                    ReturnValues="UPDATED_NEW"
                )
    except KeyError as e:
        print("Exception storing data: {}".format(e))


""" Parse the schedule CSV and store it """


def parseAndStoreOfficials():
    with open(file_officials_info, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            print("LOADING: {}".format(row['lastName']))
            storeOfficial(row)


def parseAndStorePlayoffAssignments():
    with open(file_playoff_history, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            print("ROW: {}".format(row["GAMEID"]))
            storePlayoffGame(row)


""" Entry point for API GW -> lambda invocation """


def handler(event, context):
    print("{} - {}".format(event, context))


""" Main driver """
if __name__ == '__main__':
    # parseAndStoreOfficials()
    # parseAndStorePlayoffAssignments()
    # fetchOfficials()
    # fetchPlayoffGames()
    # fetchGameCrew("2021_01_16_01")
    # fetchGameCrew("2020_01_05_01")
    fetchGameCrew("2021_01_17_01")

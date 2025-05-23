export async function graphQLFetch(JWT) {
    const query = `{
        user {
            id
            login
            firstName
            lastName
            email
            campus
            auditRatio
            totalUp
            totalDown
            xpTotal: transactions_aggregate(
                order_by: {createdAt: asc}
                where: {type:  {_eq: "xp"}, eventId:{_eq: 303}}){
                    aggregate{
                        sum {
                            amount
                        }
                    }
                    nodes {
                        amount
                        createdAt
                    }
            }
            skills: transactions( 
                order_by: {type: asc, amount: desc}
                distinct_on: [type]
                where: {eventId: {_eq: 303}, _and: {type: {_like: "skill%"}}}) {
                    type
                    amount
            }
            xp: transactions(
                order_by: {createdAt: desc}
                where: {type: {_eq: "xp"}, eventId: {_eq: 303}}
                limit: 10 ) {
                    id
                    createdAt
                    amount
                    path
            }
            audits(
              	order_by: {createdAt: desc}
              	where: {
                    _or: [
                      { closureType: { _in: [succeeded, failed] } },
                      { closureType: { _is_null: true }}]}) {
    		    id
                closureType
                private {
                    code
                }
                group{
                    status
                    captainLogin
                    path
                }
            }
        }
    }`

    const response = await fetch("https://zone01normandie.org/api/graphql-engine/v1/graphql", {
        method: "POST",
        headers: {
            authorization: `Bearer ${JWT}` 
        },
        body: JSON.stringify({query}),
    })
    return await response.json()
} 
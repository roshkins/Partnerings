# How to run

There are no dependencies, so you may run
`node index.js`

# Background and algorithm discussion

Hi there! I'm Rashi. I recently took a class where we had to break out into partners. I didn't know anyone else in the class and neither did anyone else. Every day we would come in and we had to split into partnering groups and I noticed something interesting. I wanted to meet all the people in the class. I wanted to meet someone new every day but because the typical approach to creating partnering groups was to randomly allocate them into groups I sometimes got the same person twice and I got no experience talking with someone else. this got me thinking. Is there a way to create partnering groups so that I would always meet someone new and everyone else would also meet someone new everyday that we had a partnering session.

## How I came up with my solution

I started by thinking about solutions that were not very efficient. I thought about randomly generated partnering groups and using some sort of hash table to create a dynamic programming sort of solution where I would only return partnering groups that were verified not to have been matched beforehand.

I quickly felt like this was not a very efficient solution. I knew for example that the permutation algorithm allows for numbers to be shuffled around in a programmatic way and it did not rely on this sort of dynamic programming solution. I was wondering if there was a way to do something similar. I knew that permutations or combinations was not the algorithm that I needed because those algorithms rely on the first item in that group to stay put and to only change the ones afterwards.

I remembered that when I was studying dynamic programming algorithms I came across a paper that said dynamic programming was a NP complete problem. the way that paper suggested approaching dynamic programming problems was to memorize a set of heuristics and to use those to extrapolate different ways of solving a problem. So my thought was is there something that I could think of that would get me close to the answer to this problem. So I thought about times when I had to be partnered.

I first started with the lab groups in my chemistry class at High School. The way those were assigned was grabbing a bunch of popsicle sticks right in people's names on them and drawing lost to assign the different groups. This was more or less the worst case, because the groups are randomly assigned and there's no guarantee that you wouldn't see the same person twice.

My first solution was to randomly generate partners the same way that my chemistry teacher did and do some kind of checking. If you look at the runtime of BOGO-sort we can see that the worst case scenario is that our requirement is never met and the person has to wait forever. It really becomes a probabilistic algorithm which is something I want to avoid. Still technically better, because we would have a requirement of the partners being unique.

The other time that I had to be partnered, was when I was taking a salsa class. And salsa you have to be paired with a leader and a follower. The way that these pairs are created is via very interesting algorithm. the leaders stay put and the followers move up a partner. This is all done in a circle so that the last person has someone to join who is the first person.
So did this work for my problem? Well it did generate a unique pairing every dance write each dance sort of correlated to a day of chemistry class. The problem is that not everyone got partnered up with everyone else. The leaders didn't get partnered with the other leaders, the followers didn't get partnered with the other followers. The other thing I didn't work is that I didn't have a way to use this 4 partner rings of 3 people or four people are so on and so forth. But, we had one of our requirements satisfied, so as a heuristic I wanted to dive deeper and see if this line of reasoning would work out.

I addressed the first sub problem, the leaders were not paired with the leaders and the followers were not paired with the followers. I realized that if I separated the two groups into a group of leaders that group of followers and I split those two groups into their own groups of leaders and followers each subgroup could then do the same pairing mechanism. If I had a group of just two people, I do not have to do this out again because that partnering was already satisfied. So this became a recursive solution to make sure everyone got partnered.

The other sub problem, of not having the ability to partner with 3 or more people was more interesting. let's start by thinking about having three groups. We have the leaders who stay put, the followers who move up 1, the third group who needed to do something I just didn't know what. I first thought oh maybe I should move the third group in the opposite direction of the second group, so that you know those two don't meet but the problem is that then they still see the same person of the leader group. It also seems a little bit more complex have two different directions when the original problem only required a solution of moving one group in one direction.

I wondered if there was a way I could maintain the same single direction constraint I figured it should be possible, the combination algorithm only moves in a single direction. I thought about other ways of moving the third group. I could try doing some sort of swapping, but that would make it hard to track if I visited the same person. I tried to see if I could see a similarity between the problem of going from pairings to Partners of 3 and to see if I can extrapolate.

I realize what I was doing was when I went from a partnering of one person which would make no sense but stay with me, to a partnering of two people, I was rotating the person up by 1. so I thought maybe if I rotate the third group by 2, something interesting would happen. When I thought about it it made more sense, because if I only thought about the followers and the third group, Then that offset would only be one which I knew already worked.

I wondered what sorts of properties this solution had. Did it ever repeat itself, with two people seeing the other person twice? I started by ripping up some pieces of paper to simulate these partner Rings because this was getting too much to hold of my head. I had colored Bits of Paper that I wrote numbers on and I had a different color for each of the different groups. The leaders would be red, the followers would be green, and the third group would be blue. As I played around with this algorithm by running through it with pieces of paper, I recorded on a sheet of paper all the partnerings as I encountered them. I validated in a non rigorous manner, that the partnerings were indeed always unique but why was this the case?

so I tracked how the innermost group, the blue group compared with the red group. this would be like the leaders getting matched up with the third group. I saw that the blue group would skip over every other member of the leader group, but because at the very end of doing a full cycle, the members were 1 off from being from where they started, they would alternate again, with different people from the leader group. This way they would always find a unique partner. since I previously knew that the leader group would always have a new partner with the follower group, and I also prove that the follower group would have a new partnering with the third group, I knew that I had a way for three people to be always unique.

Since I had also proved that the inductive method of moving one more for every new person added to a partnering group worked, because they would encounter every other other person and so forth, I knew this could work for any number of people.

What was interesting about this, was that because every step always moved forward, and there was no backtracking, I didn't have to think about if I would ever repeat a partnering. I knew it would be unique because my solution was generative.

I now have to think about when would my algorithm fail. Well if there was a number of people that was not a multiple of a partnering size, then someone would be stranded. Typically those people would be partnered with the teacher. In addition, because I took a recursive divide and conquer solution, I knew this would work best on some sort of exponential count of the input. I thought about the base case, and realized that because that partnering generation would be the size of the smallest possible partnering group. This Justified to me that the input should be a number that is an exponential number of the partnering size.
The final algorithm

Inputs: partneringSize, the number of people in a partnering; people, a list of people who want to be split into partnering groups.

Constraints: partneringSize should be an integer greater than 1, it there is no way to partner groups of 1 or less; the number of people should be a power of partneringSize (If you want partners of 3, you want the number of students to be 3^n, where n is any positive integer, for example 3^2 = 9, 3^3 = 27)
Outputs: A day by day breakdown of which person gets partnered with the other

## Algorithm:

Divide people into partneringSize circles.

If each circle has one person, return that person.

Iterate people.length times, rotate each circle by the index of the circle. (The first circle is 0-based, so it doesn’t move). Output the partnerings after every iteration has executed.

Once finished, feed each circle into this algorithm again, and merge the results of every iteration and display.
